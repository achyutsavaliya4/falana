// components/DraggableItem.jsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SvgIcon } from "../SvgIcon";

export default function DraggableItem({
  id,
  children,
  className = "",
  disabled = false,
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? "default" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...(disabled ? {} : attributes)}
    >
      {!disabled && (
        <div
          {...listeners}
          className="drag-handle"
          style={{
            cursor: "grab",
            display: "inline-flex",
            padding: "8px",
            marginLeft: "-8px",
            borderRadius: "4px",
            // "&:hover": {
            //   backgroundColor: "rgba(0,0,0,0.05)",
            // },
          }}
        >
          {/* <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="6" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
          </svg> */}
          <SvgIcon width={20} height={20}/>
        </div>
      )}
      {children}
    </div>
  );
}
