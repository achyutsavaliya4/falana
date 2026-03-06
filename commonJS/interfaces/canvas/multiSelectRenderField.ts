import {
  FieldAlign,
  FieldLogic,
  FieldWidth,
  HelpPosition,
  SelectOption,
} from ".";

export interface MultiSelectFieldProperty {
  type: "multi_select";
  name: string;
  id: string;

  hidden: boolean;
  required: boolean;

  multi_select: {
    options: SelectOption[];
  };

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  selectedOptionType: "custom" | "user" | "store" | "product";

  logic: FieldLogic;

  priority?: "LOW" | "MEDIUM" | "HIGH";
  src?: string;

  Field_Name?: string;
  Field_Id?: string;

  selectedOptionForConfig?: string;

  prefill?: string[];
  placeholder?: string | null;
  help?: string | null;
}
