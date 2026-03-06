import clsx from "clsx";

const StatusChip = ({
  status,
  chipType,
  bulletColor,
}: {
  status: string;
  chipType: string;
  bulletColor: string;
}) => {
  return (
    status && (
      <span className={clsx("pill",`${chipType}`)}>
        <span className={clsx("bullet",`${bulletColor}`)}>
          •
        </span>
        {status ?? ""}
      </span>
    )
  );
};

export default StatusChip;
