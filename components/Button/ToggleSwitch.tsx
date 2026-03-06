"use client";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  size = "md",
}: ToggleSwitchProps) {
  const sizes = {
    sm: { w: 34, h: 18, dot: 14 },
    md: { w: 42, h: 22, dot: 18 },
    lg: { w: 52, h: 28, dot: 24 },
  };

  const { w, h, dot } = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: `${h}px`,
        border: "1px solid #ccc",
        background: checked ? "#2563eb" : "#e5e7eb",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background 0.2s ease",
        padding: 0,
      }}
    >
      <span
        style={{
          width: `${dot}px`,
          height: `${dot}px`,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: checked ? `${w - dot - 2}px` : "2px",
          transition: "left 0.2s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}
