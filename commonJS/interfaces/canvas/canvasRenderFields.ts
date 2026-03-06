import {
  InputFieldProperty,
  EmailFieldProperty,
  NumberFieldProperty,
  UrlFieldProperty,
  SelectFieldProperty,
  MultiSelectFieldProperty,
  DateFieldProperty,
  PhoneNumberFieldProperty,
  CheckboxFieldProperty,
  FilesFieldProperty,
  LocationFieldProperty,
  ImageFieldProperty,
  NfTextFieldProperty,
  NfPageBreakFieldProperty,
  NfDividerFieldProperty,
} from ".";

export type HelpPosition = "below_input" | "above_input";

export type FieldWidth = "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4";

export type FieldAlign = "left" | "center" | "right";

export type LogicAction =
  | "require-answer"
  | "make-it-optional"
  | "disable-block"
  | "hide-block"
  | "enable-block"
  | "show-block";

export type ConditionOperator = "equals" | "not_equals" | "contains";

export type ConditionGroupOperator = "and" | "or";

export interface PropertyMeta {
  id: string;
  type: "text";
}

export interface SingleConditionValue {
  operator: ConditionOperator;
  property_meta: PropertyMeta;
  value: string | number | boolean | null;
}

export interface SingleConditionNode {
  identifier: string;
  value: SingleConditionValue;
}

export interface ConditionGroupNode {
  operatorIdentifier: ConditionGroupOperator;
  children: LogicConditionNode[];
}

export type LogicConditionNode = SingleConditionNode | ConditionGroupNode;

export interface FieldLogic {
  conditions: ConditionGroupNode | null;
  actions: LogicAction[];
}

export type properties =
  | InputFieldProperty
  | EmailFieldProperty
  | NumberFieldProperty
  | UrlFieldProperty
  | SelectFieldProperty
  | MultiSelectFieldProperty
  | DateFieldProperty
  | PhoneNumberFieldProperty
  | CheckboxFieldProperty
  | FilesFieldProperty
  | LocationFieldProperty
  | ImageFieldProperty
  | NfTextFieldProperty
  | NfPageBreakFieldProperty
  | NfDividerFieldProperty;

export interface canvasRenderFields {
  properties: properties[];
}
