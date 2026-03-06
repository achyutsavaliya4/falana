import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface FilesFieldProperty {
  type: "files";
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

  multiple: boolean;

  allowed_file_types: string;

  help: string | null;
}
