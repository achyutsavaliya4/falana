import Image from "next/image";
import { ChangeEvent, memo, useState } from "react";

export type Option = {
  //   label: string;
  //   value: any;
  [key: string]: any;
  showImage?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  isDisabled?: boolean;
};

type Props = {
  options: Option[];
  value: any;
  disabled?: boolean;
  placeholder?: string;
  onChange: (option: Option) => void; 
  optionKey: any;
  optionValue: any;
};

const PriorityDropdown = ({
  options,
  value,
  disabled = false,
  placeholder = "Select",
  onChange,
  optionKey,
  optionValue,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options?.find((o) => o?.[optionValue as string] === value);
  return (
    <div className="custom-select-wrapper">
      <div
        className={`custom-select-selected ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen((p) => !p)}
      >
        {selected ? (
          <>
            {selected?.imageUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS + (selected?.imageUrl ?? "")}`}
                className="dot-img"
                alt={selected?.imageAlt ?? ""}
                height={selected?.height ?? 10}
                width={selected?.width ?? 10}
              />
            )}
            <span>{selected?.[optionKey as string]}</span>
          </>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="custom-select-options">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`custom-select-option ${
                opt?.isDisabled ? "disabled" : ""
              }`}
              onClick={(e) => {
                if (opt?.isDisabled) return;
                onChange?.(opt);
                setIsOpen(false);
              }}
            >
               {opt?.imageUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS + (opt?.imageUrl ?? "")}`}
                    className="dot-img"
                    alt={opt?.imageAlt ?? ""}
                    height={opt?.height ?? 10}
                    width={opt?.width ?? 10}
                  />
                )}
                <span>{opt?.[optionKey as string] ?? ""}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(PriorityDropdown);
