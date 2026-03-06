import { useEffect, useState } from "react";

interface SvgIconProps {
  src?: string;
  width?: number;
  height?: number;
  color?: string;
}

export function SvgIcon({
  src = "https://www.svgrepo.com/show/535118/accessibility.svg",
  width = 16,
  height = 16,
  color = "currentColor",
}: SvgIconProps) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then(setSvg);
  }, [src]);

  return (
    <span
      style={{
        width,
        height,
        color,
        display: "inline-block",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
