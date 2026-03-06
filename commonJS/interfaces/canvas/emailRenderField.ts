import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface EmailFieldProperty {
  name: string;
  type: "email";

  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  show_char_limit: boolean;

  logic: FieldLogic;

  max_char_limit: number;

  hide_field_name: boolean;

  prefill: string | null;
  placeholder: string | null;
  help: string | null;

  required: boolean;
  disabled: boolean;
}
