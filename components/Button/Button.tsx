"use client";
import { clsx } from "clsx";
import Image from "next/image";
import { DefaultFunction } from "@/commonJS/interfaces/utilsInterface";
import { CSSProperties, memo, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Loader from "../Loader/Loader";

export interface button {
  id: string;
  fieldName: string;
  className?: ButtonResolver<string> | string;
  label?: ButtonResolver<string | undefined> | string;
  disabled?: ButtonResolver<boolean> | boolean;
  url?: ButtonResolver<string> | string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  style?: CSSProperties;
  imagePosition?: "front" | "back";
  variant?: "primary" | "secondary" | "default" | "base";
}

type ButtonResolver<Return> = DefaultFunction<button, Return>;
export type onClickFieldResolver = (
  event: MouseEvent<HTMLButtonElement>,
  field: button,
  fieldData: any,
  fullFieldData: any,
  configData: any,
  fieldIndex: number,
  repeatChildIndex?: number,
) => void;

export type Props = {
  field: button;
  fieldIndex?: number;
  fieldData?: any;
  fullFieldData?: any;
  configData?: any;
  onClickField?: onClickFieldResolver;
  style?: CSSProperties;
  repeatChildIndex?: number;
};

const Button = ({
  field,
  fieldIndex,
  fieldData,
  fullFieldData,
  configData,
  onClickField,
  style,
  repeatChildIndex
}: Props) => {
  const { btnLoaderData } = useSelector((state: RootState) => state.loader);
  const isButtonLoading =
    btnLoaderData?.isLoading &&
    btnLoaderData?.btnFieldName === field?.fieldName;
  const imageUrl =
    typeof field?.url === "function"
      ? field?.url(field, fieldData, fullFieldData, configData)
      : field?.url;

  const buttonLabel =
    typeof field?.label === "function"
      ? field?.label(field, fieldData, fullFieldData, configData)
      : field?.label;

  const disabled =
    (typeof field?.disabled === "function"
      ? field?.disabled(field, fieldData, fullFieldData, configData)
      : field?.disabled) || false;

  const className =
    typeof field?.className === "function"
      ? field?.className(field, fieldData, fullFieldData, configData)
      : field?.className;

  return (
    <button
      className={clsx(
        "button",
        field?.variant && `${field?.variant}-button`,
        imageUrl && "d-flex align-items-center",
        className,
      )}
      style={{ ...(style || {}), ...(field?.style || {}) }}
      key={"btn" + fieldIndex + field?.fieldName}
      id={field?.id ?? field?.fieldName ?? ""}
      name={buttonLabel || ""}
      {...(imageUrl ? { "aria-label": field?.imageAlt || imageUrl } : {})}
      disabled={disabled}
      onClick={(event) => {
        !isButtonLoading &&
          onClickField?.(
            event,
            field,
            fieldData,
            fullFieldData,
            configData,
            fieldIndex as number,
            repeatChildIndex
          );
      }}
    >
      {isButtonLoading && <Loader size={22} />}
      {imageUrl && field?.imagePosition === "front" && (
        <>
          <Image
            width={field?.imageWidth ?? 20}
            height={field?.imageHeight ?? 20}
            src={imageUrl}
            className={field?.imageClassName || ""}
            alt={field?.imageAlt ?? "image"}
            unoptimized={true}
          />
        </>
      )}
      {buttonLabel ?? ""}
      {imageUrl && field?.imagePosition === "back" && (
        <Image
          width={field?.imageWidth ?? 20}
          height={field?.imageHeight ?? 20}
          src={imageUrl}
          className={field?.imageClassName ?? ""}
          alt={field?.imageAlt ?? "image"}
          unoptimized={true}
        />
      )}
    </button>
  );
};

export default memo(Button);
