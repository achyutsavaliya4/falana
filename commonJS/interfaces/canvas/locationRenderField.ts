import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface LocationFieldProperty {
  type: "location";
  name: string;
  id: string;

  hidden: boolean;
  required: boolean;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;

  priority?: "LOW" | "MEDIUM" | "HIGH";
  src?: string;

  help: string | null;
}
