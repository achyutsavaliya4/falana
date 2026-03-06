"use client";

import Image from "next/image";
import { memo } from "react";

export type Props = {
  field: any;
  fieldIndex?: number;
  fieldData: any;
  fullFieldData: any;
  configData: any;
};
const Label = ({
  field,
  fieldIndex,
  fullFieldData,
  fieldData,
  configData,
}: Props) => {
  const label =
    typeof field?.labelText === "function"
      ? field?.labelText(field, fieldData, fullFieldData, configData)
      : field?.fieldName
        ? fieldData?.[field?.fieldName]
        : field?.labelText;
  if (!label && !field?.url) return;
  return (
    <label
      id={field?.id ?? field?.fieldName}
      key={"label" + fieldIndex + field?.fieldName}
      className={
        typeof field?.labelClassName === "function"
          ? field?.labelClassName(field, fieldData, fullFieldData, configData)
          : (field?.labelClassName ?? "")
      }
      aria-label={field?.inputType ?? "text"}
      style={{ ...(field?.style ?? {}) }}
    >
      {field?.url && (
        <Image
          width={field?.imageWidth ?? 10}
          height={field?.imageHeight ?? 10}
          src={field?.url}
          className={field?.imageClassName ?? ""}
          alt={field?.altText ?? "button-image"}
          unoptimized={true}
        />
      )}
      <span>{label ?? ""}</span>
    </label>
  );
};

export default memo(Label);
