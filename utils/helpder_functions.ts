type AnyFn = (...args: any[]) => any;

export const wrapperFunction = <T extends AnyFn>(
  handler: T,
  scope: Record<string, any>,
): T =>
  ((...args: any[]) => {
    console.log("➡️ Incoming args:", args);
    console.log("📦 Scope to attach:", scope);
    const lastIndex = args.length - 1;
    const lastArg = args[lastIndex];

    if (typeof lastArg === "object" && lastArg !== null) {
      args[lastIndex] = { ...lastArg, ...scope };
    } else {
      args.push(scope);
    }

    return handler?.(...args);
  }) as T;
