import { CSSProperties } from "react";
import clsx from "clsx";

export type Props = {
  field: any;
  fieldIndex?: number;
  fieldData: any;
  fullFieldData: any;
  configData: any;
  style?: CSSProperties;
  onChangeSwitch?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => void;
};
const Switch = ({
  field,
  fieldIndex,
  fieldData,
  fullFieldData,
  configData,
  style,
  onChangeSwitch,
}: Props) => {
  return (
    <>
      {field?.hideInnerLabel ? (
        <></>
      ) : field?.leftLabel ? (
        <label
          className={clsx(field?.labelClassName)}
          htmlFor={field?.htmlFor ?? field?.fieldName}
        >
          {field?.leftLabel ?? ""}
        </label>
      ) : (
        <></>
      )}
      <div
        className={clsx(
          `switch-container d-flex gap-2`,
          field?.switchClassName,
        )}
      >
        <input
          type="checkbox"
          onChange={(e: any) => onChangeSwitch?.(e, field)}
          disabled={field?.isDisabled ?? false}
          checked={fieldData?.[field?.fieldName] ?? false}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded="false"
          autoCapitalize="none"
        />
        <div className="switch"></div>
      </div>
      {field?.rightLabel ? (
        <label className={clsx(field?.rightLabelClassName)}>
          {field?.rightLabel ?? ""}
        </label>
      ) : (
        <></>
      )}
    </>
  );
};

export default Switch;
