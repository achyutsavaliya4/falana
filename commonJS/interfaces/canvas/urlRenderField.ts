import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface UrlFieldProperty {
  type: "url";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  show_char_limit: boolean;

  logic: FieldLogic;

  max_char_limit: number;

  required: boolean;
  disabled: boolean;

  generates_uuid: boolean;
  generates_auto_increment_id: boolean;

  hide_field_name: boolean;

  prefill: string | null;
  placeholder: string | null;
  help: string | null;
}
