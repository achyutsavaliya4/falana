"use client";
import { inputFieldInterface } from "@/commonJS/interfaces/renderFieldinterface/inputFieldInterface";
import clsx from "clsx";
import Image from "next/image";
import { memo, CSSProperties, ChangeEvent, KeyboardEvent } from "react";

export type Props = {
  field: inputFieldInterface;
  fieldIndex: number;
  fieldData: any;
  fullFieldData?: any;
  configData?: any;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement>,
    field: any,
    ...rest: any[]
  ) => void;
  onBlurInput?: (
    e: ChangeEvent<HTMLInputElement>,
    field: any,
    ...rest: any[]
  ) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement>,
    field: any,
    fieldData: any,
    fullFieldData: any,
    configData: any,
    repeatChildIndex?: number,
  ) => void;
  style?: CSSProperties;
  repeatChildIndex?: number;
  nesting?: any;
  regexTest?: "integer";
};

const Input = ({
  field,
  fieldIndex,
  fieldData,
  fullFieldData,
  configData,
  onChangeInput,
  onBlurInput,
  onKeyDown,
  style,
  repeatChildIndex,
  nesting,
}: Props) => {
  const isFile = field?.inputType === "file";
  const getFieldName = () => field?.fieldName;
  const fieldName = getFieldName();
  const rawValue = field.parent
    ? fieldData?.[field.parent]?.[field.fieldName ?? '']
    : fieldData?.[field.fieldName ?? ''];

  const inputId = field?.id ?? fieldName ?? `file-${fieldIndex}`;

  if (isFile) {
    return (
      <div className="upload-wrapper">
        <input
          type="file"
          id={inputId}
          name={fieldName}
          className="upload-input"
          multiple={field?.multiple ?? false}
          disabled={
            field?.isDisabled ||
            (field?.onDisabled
              ? field?.onDisabled(
                  { ...field, fieldName },
                  fieldData,
                  fullFieldData,
                )
              : false)
          }
          readOnly={field?.readOnly}
          accept={field?.accept}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeInput?.(
              e,
              { ...field, fieldName },
              fieldData,
              fullFieldData,
              configData,
              repeatChildIndex,
              nesting,
            );
          }}
          onBlur={(e) => {
            onBlurInput?.(e, { ...field, fieldName }, fieldData);
          }}
        />

        <label
          htmlFor={inputId}
          className={clsx(
            "upload-ui",
            field?.className,
            typeof field?.className === "function" &&
              field?.className(
                { ...field, fieldName },
                fieldData,
                fullFieldData,
                configData,
              ),
          )}
          style={{ ...(style ?? {}), ...(field?.style ?? {}) }}
        >
          <Image
            height={24}
            width={24}
            alt="Upload File"
            src={
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/icons/upload-cloud-blue.svg"
            }
            unoptimized
          />

          <span className="upload-text">{field?.label ?? "Upload Files"}</span>
        </label>
      </div>
    );
  }

  return (
    <input
      type={field?.inputType ?? "text"}
      className={clsx(
        field?.inputType === "checkbox" ? "primary-checkbox" : "primary-input",
        field?.className,
        typeof field?.className === "function" &&
          field?.className(
            { ...field, fieldName },
            fieldData,
            fullFieldData,
            configData,
          ),
      )}
      style={{ ...(style ?? {}), ...(field?.style ?? {}) }}
      key={"Input" + fieldIndex + fieldName}
      id={inputId}
      name={fieldName}
      title={field?.title}
      {...(field?.inputType === "checkbox"
        ? { checked: Boolean(rawValue) }
        : { value: rawValue })}
      disabled={
        field?.isDisabled ||
        (field?.onDisabled
          ? field?.onDisabled({ ...field, fieldName }, fieldData, fullFieldData)
          : false)
      }
      placeholder={field?.placeholder ?? ""}
      autoComplete="off"
      aria-autocomplete="list"
      autoCapitalize="none"
      data-focus-field={field?.focusField ?? fieldName ?? ""}
      aria-label={field?.inputType ?? "text"}
      onKeyDown={(e) => {
        field?.regexTest === "integer"
          ? ["e", "E", "+", "-", "."]?.includes(e.key) && e.preventDefault()
          : field?.inputType === "number"
            ? ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            : onKeyDown?.(
                e,
                { ...field, fieldName },
                fieldData,
                fullFieldData,
                configData,
                repeatChildIndex,
              );
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput?.(
          e,
          { ...field, fieldName },
          fieldData,
          fullFieldData,
          configData,
          repeatChildIndex,
          nesting,
        );
      }}
      onBlur={(e) => {
        onBlurInput?.(e, { ...field, fieldName }, fieldData);
      }}
      min={field?.min}
      max={field?.max}
      maxLength={field?.maxLength}
      pattern={field?.pattern}
    />
  );
};

export default memo(Input);
