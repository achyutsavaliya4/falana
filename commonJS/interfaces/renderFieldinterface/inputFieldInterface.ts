import { CSSProperties } from "react";

export interface inputFieldInterface {
  id?: string;
  fieldName?: string;
  inputType?: string;
  label?: string;
  title?: string;
  placeholder?: string;
  parent?: string;
  focusField?: string;
  showLabel?: boolean;
  multiple?: boolean;
  accept?: string;

  isDisabled?: boolean;
  onDisabled?: (
    field: inputFieldInterface,
    fieldData: any,
    fullFieldData?: any,
  ) => boolean;

  className?:
    | string
    | ((
        field: inputFieldInterface,
        fieldData: any,
        fullFieldData?: any,
        configData?: any,
      ) => string);

  style?: CSSProperties;

  min?: number | string;
  max?: number | string;
  maxLength?: number;
  pattern?: string;
  is_additional_field?: boolean;
  readOnly?: boolean;
  regexTest?: string;
  hiddenFor?: (
    field: inputFieldInterface,
    fieldData: any,
    fullFieldData?: any,
    configData?: any,
  ) => boolean
}
