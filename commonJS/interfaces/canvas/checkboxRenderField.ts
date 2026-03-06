import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface CheckboxFieldProperty {
  type: "checkbox";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;

  prefill: boolean;

  hide_field_name: boolean;

  src?: string;
  use_toggle_switch?: boolean;

  priority?: "LOW" | "MEDIUM" | "HIGH";

  help?: string | null;

  required: boolean;
  disabled: boolean;
}
