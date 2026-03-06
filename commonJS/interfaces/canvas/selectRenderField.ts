import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface SelectOption {
  name: string;
  id: string;
  is_flag: boolean;
  is_correct_answer: boolean;
}

export interface SelectFieldProperty {
  type: "select";
  name: string;
  id: string;

  hidden: boolean;
  required: boolean;

  select: {
    options: SelectOption[];
  };

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  selectedOptionType: "custom" | "user" | "store" | "product";

  logic: FieldLogic;

  src?: string;
  is_correct_answer?: boolean;
  priority?: "LOW" | "MEDIUM" | "HIGH";

  Field_Name?: string;
  Field_Id?: string;

  hide_field_name?: boolean;
  prefill?: string | null;
  placeholder?: string | null;
  help?: string | null;
}
