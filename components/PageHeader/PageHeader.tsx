import Link from "next/link";
import React, { Children } from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CommonForm from "../CommonForm/CommonForm";
import { checkArray } from "@/commonJS/commonHelper/commonHelper";
// import BreadCrumbs from "../BreadCrumbs/breadCrumbs";

interface PageHeaderInterface {
  isAdd?: boolean;
  onButtonClick?: Function;
  path?: any;
  importPath?: any;
  customButton?: Function;
  breadCrumsPath?: any;
  customAddLabel?: any;
  children?: any;
  pageheaderClassName?: string;
  addButtonText?: string;
  addButtonClassName?: string;
  formJson?: any[];
  onClickField?: any;
  fieldData?: any;
}
const PageHeader = ({
  isAdd,
  onButtonClick,
  path,
  importPath,
  customButton,
  breadCrumsPath,
  customAddLabel,
  children,
  pageheaderClassName,
  addButtonText,
  addButtonClassName,
  formJson,
  onClickField,
  fieldData,
}: PageHeaderInterface) => {
  return (
    <>
      <div
        className={`page-header-common d-flex justify-content-between ${
          pageheaderClassName ?? ""
        } ${!isAdd ? "py-2" : "py-1"}`}
      >
        <BreadCrumbs breadCrumsPath={breadCrumsPath} />
        {checkArray(formJson) ? (
          <CommonForm
            formJson={formJson ?? []}
            onClickField={onClickField}
            fieldData={fieldData}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PageHeader;
