import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface NfTextFieldProperty {
  type: "nf-text";
  name: string;
  id: string;

  hidden: boolean;

  content: string;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;
}

export interface NfPageBreakFieldProperty {
  type: "nf-page-break";
  name: string;
  id: string;

  hidden: boolean;

  next_btn_text: string;
  previous_btn_text: string;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;
}

export interface NfDividerFieldProperty {
  type: "nf-divider";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;

  required?: boolean;
}
