import clsx from "clsx";
import { memo } from "react";
export type Props = {
  field: any;
  fieldIndex?: any;
  onChangeInput: (e: React.FocusEvent<HTMLTextAreaElement>, field: any) => void;
  fieldData: any;
  fullFieldData?: any;
};
const TextArea = ({
  field,
  fieldIndex,
  onChangeInput,
  fieldData,
  fullFieldData,
}: Props) => {
  return (
    <>
      <textarea
        cols={field?.cols ?? 30}
        rows={field?.rows ?? 3}
        key={"area" + fieldIndex + field?.fieldName}
        className={clsx("primary-textrea", field?.className)}
        name={field?.label ?? ""}
        disabled={
          field?.isDisabled ||
          (field?.onDisabled
            ? field?.onDisabled(field, fieldData, fullFieldData)
            : false)
        }
        placeholder={field?.placeholder ?? ""}
        autoComplete="none"
        onChange={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          onChangeInput ? onChangeInput(e, field) : () => {};
        }}
        style={{ ...(field?.style ?? {}) }}
        value={
          field?.customValue
            ? field?.customValue(field)
            : fieldData
              ? fieldData[field?.parentField]
                ? fieldData[field?.parentField][field?.fieldName]
                : fieldData[field.fieldName]
              : ""
        }
        maxLength={field?.maxLength}
      ></textarea>
    </>
  );
};

export default memo(TextArea);
