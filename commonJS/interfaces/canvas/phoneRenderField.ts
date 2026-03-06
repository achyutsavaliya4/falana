import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface PhoneNumberFieldProperty {
  type: "phone_number";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  show_char_limit: boolean;

  logic: FieldLogic;

  max_char_limit: number;

  priority?: "LOW" | "MEDIUM" | "HIGH";
  src?: string;

  prefill: string | null;

  hide_field_name: boolean;

  placeholder: string | null;
  help: string | null;

  required: boolean;
  disabled: boolean;
}
