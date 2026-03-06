import { FieldAlign, FieldLogic, FieldWidth, HelpPosition } from ".";

export interface ImageFieldProperty {
  type: "nf-image";
  name: string;
  id: string;

  hidden: boolean;

  src: string;
  alt: string;

  help_position: HelpPosition;
  width: FieldWidth;
  align: FieldAlign;

  logic: FieldLogic;

  "nf-image": string;

  imageAlign: "left" | "center" | "right";

  required: boolean;
}
