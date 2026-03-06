"use client";
import React from "react";
import RenderField from "../RenderField/RenderField";
import "react-datepicker/dist/react-datepicker.min.css";
import ValidationTooltip from "../ValidationTooltip/ValidationTooltip";
import { isValidValidationField } from "@/utils/constants";
import {
  checkArray,
  convertTabEventKey,
} from "@/commonJS/commonHelper/commonHelper";
import { Tab, Tabs } from "react-bootstrap";
import clsx from "clsx";

export type Props = {
  formJson: any[];
  fieldData: any;
  fullFieldData?: any;
  configData?: any;
  onChangeInput?: any;
  onBlurInput?: any;
  onClickField?: any;
  onChangeSelect?: any;
  onSelectDate?: any;
  onChangeSwitch?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => void;
  onChangeSearch?: any;
  onSearchSelect?: any;
  onRemoveSelect?: any;
  isCheckValid?: boolean;
  errors?: any;
  repeatChildIndex?: number;
  nesting?: any;
};
const CommonForm = ({
  formJson,
  fieldData,
  fullFieldData,
  configData,
  onChangeInput,
  onBlurInput,
  onClickField,
  onChangeSelect,
  onSelectDate,
  isCheckValid = false,
  errors,
  onChangeSwitch,
  onChangeSearch,
  onSearchSelect,
  onRemoveSelect,
  repeatChildIndex,
  nesting,
}: Props) => {
  return (
    <>
      {formJson?.map((section: any, sectionIndex: number) => {
        return (
          <React.Fragment key={"main-section" + sectionIndex}>
            {section?.sectionType === "body" &&
            (section?.hiddenFor
              ? section?.hiddenFor(
                  section,
                  fieldData,
                  fullFieldData ?? fieldData,
                  configData,
                )
              : true) ? (
              <>
                <div
                  className={`${
                    typeof section?.rowClassName === "string"
                      ? section?.rowClassName
                      : typeof section?.rowClassName === "function"
                        ? section?.rowClassName(fieldData, fullFieldData)
                        : ""
                  }`}
                >
                  {section.showLabel && (
                    <div
                      className={`${"col-12 d-flex justify-content-start align-items-center"} `}
                    >
                      <label
                        className={section?.labelClassName ?? ""}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {section?.showLabel === false
                          ? ""
                          : (section?.label ?? "")}
                      </label>
                    </div>
                  )}
                  {section?.child?.map(
                    (
                      // bodyChild: {[key: string]: any},
                      bodyChild: { [key: string]: any },
                      bodyChildIndex: number,
                    ) => {
                      const tabsData =
                        configData?.[bodyChild?.fieldName] ||
                        bodyChild?.tabChild ||
                        [];

                      return (
                        <React.Fragment key={"fields-area" + bodyChildIndex}>
                          {bodyChild?.sectionType !== "body" &&
                            !bodyChild?.isHidden &&
                            (bodyChild?.hiddenFor
                              ? bodyChild?.hiddenFor(
                                  bodyChild,
                                  fieldData,
                                  fullFieldData ?? fieldData,
                                  configData,
                                )
                              : true) && (
                              <div
                                key={bodyChildIndex}
                                className={`${
                                  typeof bodyChild?.fieldContainerClassName ===
                                  "string"
                                    ? bodyChild?.fieldContainerClassName
                                    : typeof bodyChild?.fieldContainerClassName ===
                                        "function"
                                      ? bodyChild?.fieldContainerClassName(
                                          bodyChild,
                                          fieldData,
                                          fullFieldData,
                                        )
                                      : ""
                                }`}
                              >
                                {bodyChild?.showLabel ? (
                                  <div
                                    style={{ whiteSpace: "nowrap" }}
                                    id={bodyChild?.id ?? ""}
                                    className={`${
                                      bodyChild?.labelClassName ??
                                      "d-flex justify-content-start align-items-start"
                                    } common-label`}
                                    aria-label={bodyChild?.inputType ?? "text"}
                                  >
                                    {bodyChild?.label ?? ""}
                                    {bodyChild?.label &&
                                    typeof bodyChild?.isRequired ===
                                      "boolean" &&
                                    bodyChild?.isRequired ? (
                                      <span className="text-danger">*</span>
                                    ) : typeof bodyChild?.isRequired ===
                                        "function" &&
                                      bodyChild?.isRequired(
                                        bodyChild,
                                        fieldData,
                                        fullFieldData ?? fieldData,
                                      ) ? (
                                      <span className="text-danger">*</span>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <RenderField
                                  field={bodyChild}
                                  fieldIndex={bodyChildIndex}
                                  fieldData={fieldData}
                                  fullfieldData={fullFieldData}
                                  configData={configData}
                                  onChangeInput={onChangeInput}
                                  onBlurInput={onBlurInput}
                                  onClickField={onClickField}
                                  onChangeSelect={onChangeSelect}
                                  onSelectDate={onSelectDate}
                                  onChangeSwitch={onChangeSwitch}
                                  onChangeSearch={onChangeSearch}
                                  onSearchSelect={onSearchSelect}
                                  onRemoveSelect={onRemoveSelect}
                                  isCheckValid={isCheckValid}
                                  errors={errors}
                                  repeatChildIndex={repeatChildIndex}
                                  nesting={nesting}
                                />
                                {isValidValidationField?.includes(
                                  bodyChild?.fieldType,
                                ) && (
                                  <ValidationTooltip
                                    isCheckValid={isCheckValid}
                                    bodyChild={bodyChild}
                                    fieldData={fieldData}
                                    fullFieldData={fullFieldData}
                                    errors={errors}
                                  />
                                )}
                              </div>
                            )}
                          {bodyChild?.sectionType === "body" && (
                            <CommonForm
                              formJson={[bodyChild]}
                              fieldData={
                                bodyChild?.parentKey
                                  ? fieldData?.[bodyChild?.parentKey]?.[
                                      bodyChild?.filedKey
                                    ]
                                  : bodyChild?.filedKey
                                    ? fieldData?.[bodyChild?.filedKey]
                                    : fieldData
                              }
                              fullFieldData={
                                fullFieldData ? fullFieldData : fieldData
                              }
                              configData={configData}
                              onChangeInput={onChangeInput}
                              onBlurInput={onBlurInput}
                              onClickField={onClickField}
                              onChangeSelect={onChangeSelect}
                              onSelectDate={onSelectDate}
                              onChangeSwitch={onChangeSwitch}
                              isCheckValid={isCheckValid}
                              onChangeSearch={onChangeSearch}
                              onSearchSelect={onSearchSelect}
                              onRemoveSelect={onRemoveSelect}
                              repeatChildIndex={repeatChildIndex}
                              nesting={{
                                ...nesting,
                                nest: {
                                  index: sectionIndex,
                                  item: bodyChild?.parentKey
                                    ? fieldData?.[bodyChild?.parentKey]?.[
                                        bodyChild?.filedKey
                                      ]
                                    : bodyChild?.filedKey
                                      ? fieldData?.[bodyChild?.filedKey]
                                      : fieldData,
                                },
                              }}
                            />
                          )}
                          {bodyChild?.sectionType === "body-repeat" &&
                            checkArray(
                              (fieldData as any)?.[bodyChild?.fieldName],
                            ) &&
                            (fieldData as any)?.[bodyChild?.fieldName]?.map(
                              (item: any, index: number) => (
                                <CommonForm
                                  key={`repeat-${index}`}
                                  formJson={[
                                    { ...bodyChild, sectionType: "body" },
                                  ]}
                                  nesting={{
                                    nesting,
                                    nest: { index: index, item },
                                  }}
                                  fieldData={item}
                                  fullFieldData={fullFieldData ?? fieldData}
                                  configData={configData}
                                  onChangeInput={onChangeInput}
                                  onBlurInput={onBlurInput}
                                  onClickField={onClickField}
                                  onChangeSelect={onChangeSelect}
                                  onSelectDate={onSelectDate}
                                  isCheckValid={isCheckValid}
                                  errors={errors}
                                  onChangeSwitch={onChangeSwitch}
                                  onChangeSearch={onChangeSearch}
                                  onSearchSelect={onSearchSelect}
                                  onRemoveSelect={onRemoveSelect}
                                  repeatChildIndex={index}
                                />
                              ),
                            )}
                          {bodyChild?.sectionType === "tabs" && (
                            <div
                              className={clsx(
                                bodyChild?.alignment === "vertical" &&
                                  "d-flex align-vertical",
                              )}
                            >
                              <Tabs
                                // As per Required
                                // defaultActiveKey="profile"
                                id={bodyChild?.id ?? bodyChild?.fieldName}
                                className={clsx(
                                  bodyChild?.varient &&
                                    `${bodyChild?.varient}-tabs`,
                                  bodyChild?.className,
                                )}
                              >
                                {checkArray(tabsData) &&
                                  tabsData?.map((data: any, index: number) => {
                                    const tabTitle = bodyChild?.titleFieldName
                                      ? data?.[bodyChild?.titleFieldName]
                                      : data?.title;
                                    const tabFieldData = bodyChild?.fieldName
                                      ? fieldData?.[bodyChild?.fieldName][index]
                                      : data?.fieldName
                                        ? fieldData?.[data?.fieldName]
                                        : data;
                                    const tabFormJson =
                                      bodyChild?.child ?? data?.child;
                                    const tabEventKey =
                                      convertTabEventKey(tabTitle);
                                    const tabsMeta = {
                                      event_key: tabEventKey,
                                      title: tabTitle,
                                      tabIndex: index,
                                    };

                                    return (
                                      <Tab
                                        key={tabEventKey + index}
                                        eventKey={tabEventKey}
                                        title={tabTitle}
                                      >
                                        <CommonForm
                                          formJson={tabFormJson}
                                          fieldData={tabFieldData}
                                          fullFieldData={
                                            fullFieldData ?? fieldData
                                          }
                                          configData={configData}
                                          onChangeInput={onChangeInput}
                                          onBlurInput={onBlurInput}
                                          onClickField={onClickField}
                                          onChangeSelect={onChangeSelect}
                                          onSelectDate={onSelectDate}
                                          isCheckValid={isCheckValid}
                                          onChangeSearch={onChangeSearch}
                                          onSearchSelect={onSearchSelect}
                                          repeatChildIndex={index}
                                          onRemoveSelect={onRemoveSelect}
                                          nesting={nesting}
                                        />
                                        {/* <CommonForm
                                          formJson={tabFormJson}
                                          fieldData={tabFieldData}
                                          fullFieldData={
                                            fullFieldData ?? fieldData
                                          }
                                          configData={configData}
                                          onChangeInput={wrapperFunction(
                                            onChangeInput,
                                            tabsMeta,
                                          )}
                                          onBlurInput={wrapperFunction(
                                            onBlurInput,
                                            tabsMeta,
                                          )}
                                          onClickField={wrapperFunction(
                                            onClickField,
                                            tabsMeta,
                                          )}
                                          onChangeSelect={wrapperFunction(
                                            onChangeSelect,
                                            tabsMeta,
                                          )}
                                          onSelectDate={wrapperFunction(
                                            onSelectDate,
                                            tabsMeta,
                                          )}
                                          onChangeSwitch={wrapperFunction(
                                            onChangeSwitch,
                                            tabsMeta,
                                          )}
                                          isCheckValid={isCheckValid}
                                          onChangeSearch={wrapperFunction(
                                            onChangeSearch,
                                            tabsMeta,
                                          )}
                                          onSearchSelect={wrapperFunction(
                                            onSearchSelect,
                                            tabsMeta,
                                          )}
                                          onRemoveSelect={wrapperFunction(
                                            onRemoveSelect,
                                            tabsMeta,
                                          )}
                                          repeatChildIndex={index}
                                        /> */}
                                      </Tab>
                                    );
                                  })}
                              </Tabs>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    },
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CommonForm;
