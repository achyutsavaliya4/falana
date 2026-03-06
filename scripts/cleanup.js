#!/usr/bin/env node

/**
 * cleanup.js
 * ──────────
 * A central script that:
 *   1. Removes ALL console.log statements from the project
 *      – single-line, multi-line, leading/trailing whitespace, blank lines left behind
 *      – line-commented:  // console.log(...)
 *      – block-commented: /* console.log(...) *\/
 *   2. Removes unused imports via ESLint --fix (eslint-plugin-unused-imports)
 *
 * Usage:
 *   node scripts/cleanup.js          ← processes the whole project
 *   node scripts/cleanup.js --dry    ← preview-only, no files written
 */

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── Configuration ────────────────────────────────────────────────────────────

/** File extensions to process */
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

/** Directories to skip entirely */
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
  "build",
  "dist",
  ".cache",
  "scripts", // skip this script itself
]);

/** Root of the project (one level up from /scripts) */
const PROJECT_ROOT = path.resolve(__dirname, "..");

/** Whether we are in dry-run mode */
const DRY_RUN = process.argv.includes("--dry");

// ─── Regex Patterns ───────────────────────────────────────────────────────────

/**
 * Matches any of the following forms, including multi-line calls:
 *
 *   console.log(...)                       ← plain
 *   console.log(                           ← multi-line open
 *     'a', b,                              ← continuation lines
 *   )                                      ← closing paren + semicolon?
 *   // console.log(...)                    ← single-line comment
 *   /* console.log(...) *\/               ← block comment (single line)
 *
 * Strategy:
 *   Phase 1 – strip single/multi-line // and \/* *\/ comments that CONTAIN console.log
 *   Phase 2 – strip actual console.log(...) calls, plus resulting blank lines
 */

// Matches an entire // comment line whose content is (optional whitespace +) console.log(...)
// Captures the newline at the end so the whole line is removed cleanly.
const SINGLE_LINE_COMMENTED = /^[^\S\r\n]*\/\/[^\S\r\n]*console\s*\.\s*log\s*\(.*\)[^\S\r\n]*;?[^\S\r\n]*(\r?\n|$)/gm;

// Matches a block comment on one line that contains console.log
const BLOCK_COMMENT_INLINE = /\/\*[^*]*console\s*\.\s*log[\s\S]*?\*\//g;

// Matches a real console.log call, including multi-line ones.
// We use a parenthesis-depth counter in the JS logic rather than one giant regex
// because regex cannot handle arbitrary nesting reliably.

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Removes multi-line block comments that are entirely on their own and contain
 * console.log, e.g.:
 *   /*
 *    * console.log(foo)
 *    *\/
 */
function removeBlockCommentedConsoleLogs(src) {
  // Match /* ... */ blocks (non-greedy) that contain console.log anywhere inside
  return src.replace(/\/\*[\s\S]*?console\s*\.\s*log[\s\S]*?\*\//g, "");
}

/**
 * Removes console.log(...) calls, including multi-line ones, using a
 * character-by-character depth scan so nested parentheses are handled correctly.
 *
 * Also removes the entire source line if console.log was its only non-whitespace
 * content.
 */
function removeConsoleLogs(src) {
  const marker = "console.log";
  let result = "";
  let i = 0;

  while (i < src.length) {
    // Try to match "console.log" at current position
    if (src.startsWith(marker, i)) {
      // Walk back to find where the current line started so we can check if
      // console.log is the only thing on the line.
      let lineStart = result.lastIndexOf("\n") + 1;
      const beforeOnLine = result.slice(lineStart).trim();

      // Skip to the opening parenthesis (may have whitespace between log and '(')
      let j = i + marker.length;
      while (j < src.length && src[j] !== "(" && src[j] !== "\n") j++;

      if (src[j] === "(") {
        // Walk through characters counting depth to find the matching ')'
        let depth = 0;
        let k = j;
        while (k < src.length) {
          const ch = src[k];
          if (ch === "(") depth++;
          else if (ch === ")") {
            depth--;
            if (depth === 0) break;
          } else if (ch === '"' || ch === "'" || ch === "`") {
            // Skip string literals so parens inside strings don't throw off count
            const quote = ch;
            k++;
            while (k < src.length) {
              if (src[k] === "\\" ) { k += 2; continue; } // escape
              if (src[k] === quote) break;
              k++;
            }
          }
          k++;
        }

        // k now points at the closing ')'
        let end = k + 1; // one past ')'

        // Swallow optional semicolon
        if (src[end] === ";") end++;

        // If console.log was the ONLY non-whitespace content on this line,
        // also consume the trailing newline so we don't leave a blank line.
        const afterOnLine = src.slice(end).match(/^[^\S\r\n]*/)[0];
        const nextChar = src[end + afterOnLine.length];

        if (beforeOnLine === "" && (nextChar === "\n" || nextChar === "\r" || nextChar === undefined)) {
          // Remove any leading whitespace we already added to result for this line
          result = result.slice(0, lineStart);
          // Skip past trailing whitespace + newline in source
          end += afterOnLine.length;
          if (src[end] === "\r") end++;
          if (src[end] === "\n") end++;
        }

        i = end;
        continue;
      }
      // No '(' found on the same line – unusual, just leave it
    }

    result += src[i];
    i++;
  }

  return result;
}

/**
 * Clean up artefacts left after removal:
 *   – multiple consecutive blank lines → at most one blank line
 */
function collapseBlankLines(src) {
  return src.replace(/(\r?\n[^\S\r\n]*){3,}/g, "\n\n");
}

/**
 * Full pipeline for one file.
 */
function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  let updated = original;
  updated = removeBlockCommentedConsoleLogs(updated); // /* console.log */ (multi-line)
  updated = updated.replace(SINGLE_LINE_COMMENTED, "");  // // console.log(...)
  updated = updated.replace(BLOCK_COMMENT_INLINE, "");   // /* console.log(...) */ inline
  updated = removeConsoleLogs(updated);                  // actual calls (incl. multi-line)
  updated = collapseBlankLines(updated);

  if (updated !== original) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, updated, "utf8");
    }
    return true; // file was changed
  }
  return false;
}

/**
 * Recursively collect all target files under `dir`.
 */
function collectFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        collectFiles(path.join(dir, entry.name), files);
      }
    } else if (entry.isFile() && TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(function main() {
  console.log(`\n🧹  Cleanup Script  ${DRY_RUN ? "[DRY RUN – no files will be written]" : ""}`);
  console.log(`   Root: ${PROJECT_ROOT}\n`);

  // ── Step 1: Remove console.logs ──────────────────────────────────────────
  console.log("Step 1/2 — Removing console.log statements...");
  const files = collectFiles(PROJECT_ROOT);
  let changed = 0;

  for (const f of files) {
    const wasChanged = processFile(f);
    if (wasChanged) {
      console.log(`  ✔  ${path.relative(PROJECT_ROOT, f)}`);
      changed++;
    }
  }

  console.log(`\n  ${changed} file(s) modified${DRY_RUN ? " (dry run)" : ""}.\n`);

  // ── Step 2: Remove unused imports via ESLint ──────────────────────────────
  console.log("Step 2/2 — Removing unused imports (ESLint --fix)...");

  if (DRY_RUN) {
    console.log("  [Dry run] Skipping ESLint auto-fix.\n");
  } else {
    try {
      execSync(
        `npx eslint --fix "**/*.{ts,tsx,js,jsx}" --rule "unused-imports/no-unused-imports: error"`,
        { cwd: PROJECT_ROOT, stdio: "inherit" }
      );
      console.log("\n  ✔  ESLint unused-imports fix complete.\n");
    } catch {
      // ESLint exits non-zero if there are unfixable errors that's fine.
      console.log("\n  ⚠  ESLint finished (some non-fixable issues may remain).\n");
    }
  }

  console.log("✅  Cleanup complete!\n");
})();
