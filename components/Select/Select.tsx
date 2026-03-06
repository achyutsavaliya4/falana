import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, memo } from "react";

export type Props = {
  field: any;
  fieldIndex?: number;
  fieldData: any;
  fullFieldData: any;
  configData: any;
  onChangeSelect: (e: ChangeEvent<HTMLSelectElement>, field: any) => void;
};

const Select = ({
  field,
  fieldIndex,
  fieldData,
  fullFieldData,
  configData,
  onChangeSelect,
}: Props) => {
  return (
    <div
      className={clsx(field?.selectWrapperClassName, "position-relative p-0")}
    >
      <select
        className={clsx(field?.className, "primary-select")}
        key={"select" + fieldIndex + field?.fieldName}
        disabled={
          field?.isDisabled ||
          (field?.onDisabled
            ? field?.onDisabled(field, fieldData, fullFieldData, configData)
            : false)
        }
        value={fieldData ? fieldData?.[field?.fieldName] : ""}
        onChange={(e) => {
          onChangeSelect ? onChangeSelect(e, field) : () => {};
        }}
        style={{ ...(field?.style ?? {}) }}
      >
        <option disabled selected>
          {field?.optionPlaceholder ?? "select"}
        </option>
        {field?.fieldName && configData
          ? configData[field?.fieldName]?.map(
              (fieldSelect: any, idx: number) => {
                return (
                  <option
                    id={fieldSelect?.id ?? ""}
                    key={"op" + idx}
                    value={`${
                      field?.optionValue
                        ? fieldSelect[field?.optionValue]
                        : fieldSelect
                    }`}
                    disabled={fieldSelect?.isDisabled ?? false}
                    // selected={fieldSelect?.isSelected ?? false}
                  >
                    {field?.optionKey
                      ? fieldSelect[field?.optionKey]
                      : fieldSelect}
                  </option>
                );
              },
            )
          : null}
      </select>
      <span className="select-icon">
        <Image
          width={24}
          height={24}
          src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS}/icons/down-arrow-black.svg`}
          alt="arrow-icon"
          unoptimized
        />
      </span>
    </div>
  );
};

export default memo(Select);
