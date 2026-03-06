import Image from "next/image";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface ValidationTooltipProps {
  isCheckValid: boolean;
  bodyChild: any;
  fieldData: any;
  fullFieldData: any;
  errors: any;
}

const renderTooltip = (props: any, message: string) => (
  <Tooltip id="button-tooltip" className="error-tooltip" {...props}>
    {message}
  </Tooltip>
);

const ValidationTooltip = ({
  isCheckValid,
  bodyChild,
  fieldData,
  fullFieldData,
  errors,
}: ValidationTooltipProps) => {
  const disabled =
    bodyChild?.isDisabled ||
    (bodyChild?.onDisabled
      ? bodyChild?.onDisabled(bodyChild, fieldData, fullFieldData)
      : false);
  if (!isCheckValid || disabled || !bodyChild?.validation) return;
  const isValidData = !!bodyChild?.validation?.(
    fieldData
      ? fieldData[bodyChild.parent]
        ? fieldData[bodyChild.parent][bodyChild?.fieldName]
        : fieldData[bodyChild?.fieldName]
      : "",
    bodyChild?.compareField ? fieldData[bodyChild?.compareField] : "",
    fullFieldData ?? fieldData,
    errors,
    bodyChild,
  )?.isValid;
  // console.log("bodyChild",bodyChild, isValidData);
  if (isValidData) return;
  const message =
    bodyChild?.validation?.(
      fieldData
        ? fieldData[bodyChild.parent]
          ? fieldData[bodyChild.parent][bodyChild?.fieldName]
          : fieldData[bodyChild?.fieldName]
        : "",
      bodyChild?.compareField ? fieldData[bodyChild?.compareField] : "",
      fullFieldData,
      errors,
      bodyChild,
    )?.message ?? "";
  // console.log("ValidationTooltip bodyChild", bodyChild, isValidData, message);

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => renderTooltip(props, message)}
    >
      <Image
        src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/error-red.svg"}
        className={`error-icon ${
          bodyChild?.errorleftPlacement ? "error-icon-left" : ""
        }`}
        width={18}
        height={18}
        alt="error"
        unoptimized={true}
      />
    </OverlayTrigger>
  );
};

export default ValidationTooltip;
