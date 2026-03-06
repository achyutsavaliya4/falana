import clsx from "clsx";
import { useState } from "react";

type ExpandComponentProps<T = any> = {
  rowValue: {
    showMore?: boolean;
    [key: string]: any;
  };
  data: T[];
  list: boolean;
  objectName: string;
  controlClick: (rowValue: any, showMore: boolean, expandKey?: string) => void;
  expandWrapperClassName?: string;
  expandKey?: string;
};

const ExpandComponent = <T,>({
  rowValue,
  data,
  list,
  objectName,
  controlClick,
  expandWrapperClassName,
  expandKey
}: ExpandComponentProps<T>) => {
    const isExpanded = expandKey
    ? rowValue?._expand?.[expandKey] ?? false
    : rowValue?.showMore ?? false;

  if (!list) return null;

  return (
    <div className={clsx("d-flex flex-column", "expand-component", expandWrapperClassName)}>
      {data?.map((d: any, i: number) => {
        // if (!d?.[objectName]) return null;

        if (i < 2 || isExpanded) {
          return (
            <li className="list-unstyled" key={i}>
              {(typeof d === "object" && d !== null) ? d?.[objectName] : d ?? ""}
            </li>
          );
        }

        return null;
      })}

      {data?.length > 2 && !isExpanded ? (
        <span
          className="expand-control"
          onClick={(e) => {
            e.preventDefault();
            controlClick(rowValue, true, expandKey)
          }}
        >
          + {data?.length - 2} More
        </span>
      ) : (
        isExpanded && (
          <span
            className="expand-control"
            onClick={(e) => {
              e.preventDefault();
              controlClick(rowValue, false, expandKey)
            }}
          >
            Show Less
          </span>
        )
      )}
    </div>
  );
};

export default ExpandComponent;
