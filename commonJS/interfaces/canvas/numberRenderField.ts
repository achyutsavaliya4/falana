import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface NumberFieldProperty {
  type: "number";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  show_char_limit: boolean;

  logic: FieldLogic;

  max_char_limit: number;

  // number special flags
  is_rating?: boolean;
  is_scale?: boolean;
  is_slider?: boolean;

  rating_max_value?: number;

  prefill?: string | null;
  placeholder?: string | null;
  help: string | null;

  hide_field_name?: boolean;
  required?: boolean;

  disabled: boolean;
}
