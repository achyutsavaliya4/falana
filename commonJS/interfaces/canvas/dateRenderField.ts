import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface DateFieldProperty {
  type: "date";
  name: string;
  id: string;

  hidden: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;

  date_range: boolean;
  with_time: boolean;

  prefill_today: boolean;

  prefill: string | [string, string] | string[] | null;

  disable_future_dates: boolean;
  disable_past_dates: boolean;

  required: boolean;
  disabled: boolean;

  generates_uuid: boolean;
  generates_auto_increment_id: boolean;

  priority?: "LOW" | "MEDIUM" | "HIGH";
  src?: string;

  help?: string | null;

  timezone?: string;
}
