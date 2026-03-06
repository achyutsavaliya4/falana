import { HelpPosition, FieldWidth, FieldAlign, FieldLogic } from ".";

export interface InputFieldProperty {
  name: string;
  type: "text";

  hidden: boolean;
  required: boolean;

  id: string;

  placeholder: string | null;
  prefill: string | null;
  help: string | null;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  show_char_limit: boolean;

  logic: FieldLogic;

  max_char_limit: number;

  generates_uuid: boolean;
  generates_auto_increment_id: boolean;

  disabled: boolean;
  hide_field_name: boolean;

  multi_lines?: boolean;
}
