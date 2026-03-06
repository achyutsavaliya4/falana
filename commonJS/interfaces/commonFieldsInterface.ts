export interface BaseField {
  name: string;
  type: string;

  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;

  placeholder?: string | null;
  prefill?: any;
  help?: string | null;
  help_position?: "below_input" | "above_input";

  width?: "full" | "half";
  align?: "left" | "center" | "right";

  priority?: "LOW" | "MEDIUM" | "HIGH";

  logic?: {
    conditions: any[] | null;
    actions: any[];
  };
}

export interface TextField extends BaseField {
  type: "text" | "email" | "url";

  multi_lines?: boolean;
  show_char_limit?: boolean;
  max_char_limit?: number;

  hide_field_name?: boolean;
  generates_uuid?: boolean;
  generates_auto_increment_id?: boolean;

  src?: string;
}

export interface DateField extends BaseField {
  type: "date";

  date_range?: boolean;
  with_time?: boolean;
  prefill_today?: boolean;

  disable_past_dates?: boolean;
  disable_future_dates?: boolean;

  src?: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";

  prefill?: boolean;
  hide_field_name?: boolean;

  src?: string;
}

export interface SelectOption {
  id: string;
  name: string;
  is_flag?: boolean;
  is_correct_answer?: boolean;
}

export interface SelectField extends BaseField {
  type: "select";

  select: {
    options: SelectOption[];
  };

  selectedOptionType?: "custom" | "default";
  src?: string;
}

export interface MultiSelectField extends BaseField {
  type: "multi_select";

  multi_select: {
    options: SelectOption[];
  };

  selectedOptionForConfig?: string;
  src?: string;
}

export interface NumberField extends BaseField {
  type: "number";

  is_rating?: boolean;
  is_scale?: boolean;
  is_slider?: boolean;

  rating_max_value?: number;

  max_char_limit?: number;
  src?: string;
}

export interface FileField extends BaseField {
  type: "files";

  multiple?: boolean;
  allowed_file_types?: string;
  src?: string;
}

export interface ImageField extends BaseField {
  type: "nf-image";
  src: string;
  alt?: string;
  imageAlign?: "left" | "center" | "right";
}

export type FormField =
  | TextField
  | DateField
  | CheckboxField
  | SelectField
  | MultiSelectField
  | NumberField
  | FileField
  | ImageField;
