import { IntegerOnlyArr, NumberOnlyArr } from "@/utils/constants";
import Image from "next/image";
import { Form } from "react-bootstrap";
import ExpandComponent from "../ExpandComponent/ExpandComponent";

interface ActionComponentInterface {
  columnData?: any;
  rowValue?: any;
  rowIdx: number;
  data?: any[];
  onClickActionField?: (
    fieldId: string,
    rowValue: any,
    rowIdx?: number,
    parentRowIdx?: number
  ) => void;
  onChangeActionField?: Function;
  onBlurActionField?: Function;
  configData?: any;
  permissons?: any;
  columnIdx?: number;
  fullFieldData?: any;
  parentRowIdx?: number;
  expandControlClick?: (
    rowValue: any,
    showMore: boolean,
    expandKey?: string,
    actionField?: any,
    rowIdx?: number
  ) => void;
}

const ActionComponent = ({
  columnData,
  rowValue,
  rowIdx,
  data,
  onClickActionField,
  onChangeActionField,
  onBlurActionField,
  configData,
  permissons,
  columnIdx,
  fullFieldData,
  parentRowIdx,
  expandControlClick

}: ActionComponentInterface) => {
  // const { btnLoaderData } = useSelector((state) => state?.loader);
  const btnLoaderData = { isLoading: true, btnFieldName: "dummy" };
  return (
    <div
      className={`d-flex align-items-center ${
        columnData?.actionColumnContainerClassName ?? ""
      }`}
    >
      {columnData?.actionFields?.length &&
        columnData?.actionFields.map(
          (actionField: any, actionFieldIndex: number) => {
            return (
              !(
                actionField?.hiddenFor &&
                actionField?.hiddenFor(rowValue, configData, fullFieldData)
              ) &&
              (actionField?.permissions
                ? actionField?.permissions(permissons)
                : true) && (
                <div
                  key={"actionfiled" + actionField?.fieldId}
                  data-bs-toggle="tooltip"
                  data-bs-placement={`${
                    actionField?.titlePlacement
                      ? actionField?.titlePlacement
                      : "top"
                  }`}
                  title={`${
                    typeof actionField?.title === "string"
                      ? actionField?.title
                      : typeof actionField?.title === "function"
                      ? actionField?.title(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          fullFieldData
                        )
                      : ""
                  }`}
                >
                  {actionField?.customActionField ? (
                    actionField?.customActionField(
                      actionField?.fieldId,
                      rowValue
                    )
                  ) : actionField?.fieldType === "button" ? (
                    <button
                      key={actionFieldIndex}
                      disabled={
                        actionField?.isDisabled
                          ? actionField?.isDisabled(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx,
                              fullFieldData
                            )
                          : false
                      }
                      onClick={(e) => {
                        e.stopPropagation();

                        const isBtnLoading =
                          btnLoaderData?.isLoading &&
                          btnLoaderData?.btnFieldName === actionField?.fieldId;

                        if (!onClickActionField || isBtnLoading) return;

                        onClickActionField(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          parentRowIdx
                        );
                      }}
                      data-bs-toggle="tooltip"
                      data-bs-placement={`${
                        actionField?.titlePlacement
                          ? actionField?.titlePlacement
                          : "top"
                      }`}
                      title={`${
                        typeof actionField?.title === "string"
                          ? actionField?.title
                          : typeof actionField?.title === "function"
                          ? actionField?.title(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx
                            )
                          : ""
                      }`}
                      className={`${actionField?.actionButtonClassName ?? ""}`}
                    >
                      {actionField?.fillCustomlabel ? (
                        actionField?.fillCustomlabel(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          fullFieldData
                        )
                      ) : actionField?.buttonText ? (
                        actionField?.buttonText
                      ) : actionField?.buttonImageUrl ? (
                        <Image
                          src={actionField?.buttonImageUrl}
                          alt={actionField?.alt ?? "eye"}
                          width={actionField?.imageWidth ?? 20}
                          height={actionField?.imageHeight ?? 20}
                        />
                      ) : (
                        ""
                      )}
                    </button>
                  ) : actionField?.fieldType === "input" ? (
                    <div
                      className={`d-flex align-items-center position-relative w-100 ${
                        actionField?.fieldContainerClassName ?? ""
                      }`}
                    >
                      {actionField?.customField &&
                        actionField?.customField(
                          actionField?.fieldId
                            ? rowValue?.[actionField?.fieldId]
                            : "",
                          actionField,
                          rowValue,
                          rowIdx
                        )}
                      <input
                        type={actionField?.inputFieldType ?? "text"}
                        className={`form-control ${
                          actionField?.className ?? ""
                        }`}
                        key={
                          "Input" + actionFieldIndex + actionField?.fieldName
                        }
                        id={actionField?.fieldName}
                        name={actionField?.fieldName}
                        disabled={
                          actionField?.isDisabled ||
                          (actionField?.onDisabled
                            ? actionField?.onDisabled(
                                actionField,
                                rowValue,
                                data,
                                fullFieldData
                              )
                            : false)
                        }
                        placeholder={actionField?.placeholder ?? ""}
                        aria-label={actionField?.inputType ?? "text"}
                        onKeyDown={(e) => {
                          actionField?.regexTest === "integer"
                            ? IntegerOnlyArr.includes(e.key) &&
                              e.preventDefault()
                            : actionField?.inputType === "number"
                            ? NumberOnlyArr.includes(e.key) &&
                              e.preventDefault()
                            : () => {};
                        }}
                        title={`${
                          typeof actionField?.title === "string"
                            ? actionField?.title
                            : typeof actionField?.title === "function"
                            ? actionField?.title(
                                actionField?.fieldId,
                                rowValue,
                                rowIdx
                              )
                            : ""
                        }`}
                        tabIndex={actionField?.tabIndex ?? null}
                        autoComplete="off"
                        aria-autocomplete="list"
                        autoCapitalize="none"
                        onChange={(e: any) => {
                          onChangeActionField
                            ? onChangeActionField(
                                e,
                                actionField?.fieldId,
                                rowValue,
                                rowIdx,
                                data
                              )
                            : () => {};
                        }}
                        onBlur={(e) => {
                          onBlurActionField
                            ? onBlurActionField(
                                e,
                                actionField?.fieldId,
                                rowValue,
                                rowIdx,
                                data
                              )
                            : () => {};
                        }}
                        value={
                          actionField?.fieldId
                            ? rowValue?.[actionField?.fieldId]
                            : ""
                        }
                        min={actionField?.min}
                        max={actionField?.max}
                        maxLength={actionField?.maxLength}
                      />
                    </div>
                  ) : actionField?.fieldType === "checkbox" ? (
                    <Form.Check
                      type="checkbox"
                      id={actionField?.id ?? "id"}
                      className={`${actionField?.className ?? ""} pos-checkbox`}
                      checked={
                        actionField?.fieldId
                          ? rowValue?.[actionField?.fieldId]
                          : false
                      }
                      tabIndex={actionField?.tabIndex ?? null}
                      onChange={(e: any) => {
                        onChangeActionField
                          ? onChangeActionField(
                              e,
                              actionField?.fieldId,
                              rowValue,
                              rowIdx
                            )
                          : () => {};
                      }}
                      name={actionField?.fieldName}
                      disabled={actionField?.isDisabled}
                    />
                  ) : actionField?.fieldType === "switch" ? (
                    <Form.Check
                      type="switch"
                      id={actionField?.id ?? "id"}
                      className={`${
                        actionField?.className ?? ""
                      } action-component-switch`}
                      checked={
                        actionField?.fieldId
                          ? rowValue?.[actionField?.fieldId]
                          : false
                      }
                      tabIndex={actionField?.tabIndex ?? null}
                      onChange={(e: any) => {
                        onChangeActionField
                          ? onChangeActionField(
                              e,
                              actionField?.fieldId,
                              rowValue,
                              rowIdx
                            )
                          : () => {};
                      }}
                      name={actionField?.fieldName}
                      disabled={
                        actionField?.isDisabled ||
                        (actionField?.onDisabled
                          ? actionField?.onDisabled(
                              actionField,
                              rowValue,
                              data,
                              fullFieldData
                            )
                          : false)
                      }
                    />
                  ) : actionField?.fieldType === "action_text" ? (
                    <div
                      onClick={() => {
                        if (!onClickActionField) return;

                        const isEnabled = actionField?.isDisabled
                          ? actionField.isDisabled(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx,
                              fullFieldData
                            )
                          : true;

                        if (!isEnabled) return;

                        onClickActionField(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          parentRowIdx
                        );
                      }}
                      className={`cursor-pointer ${
                        typeof actionField?.actionTextClassName === "string"
                          ? actionField?.actionTextClassName
                          : typeof actionField?.actionTextClassName ===
                            "function"
                          ? actionField?.actionTextClassName(
                              actionField,
                              rowValue,
                              rowIdx,
                              fullFieldData,
                              configData
                            )
                          : ""
                      }`}
                    >
                      {actionField?.fillCustomlabel ? (
                        actionField?.fillCustomlabel(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          fullFieldData
                        )
                      ) : actionField?.actionText ? (
                        actionField?.actionText
                      ) : actionField?.buttonImageUrl ? (
                        <Image
                          src={actionField?.buttonImageUrl}
                          alt="eye"
                          width={24}
                          height={24}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : actionField?.fieldType === "expand" ? (
                    <ExpandComponent
                      rowValue={rowValue}
                      data={
                        actionField?.fieldId
                          ? rowValue?.[actionField?.fieldId]
                          : []
                      }
                      list={actionField?.isList ?? true}
                      objectName={actionField?.objectName ?? actionField?.fieldId ?? ""}
                      expandWrapperClassName={actionField?.expandWrapperClassName ?? ""}
                      controlClick={(rowValue, showMore, expandKey) => {
                        expandControlClick?.(rowValue, showMore, expandKey, actionField, rowIdx);
                      }}
                      expandKey={actionField?.expandKey ?? ""}
                    />
                  ) : actionField?.dynamicValueButton ? (
                    <button
                      key={actionFieldIndex}
                      disabled={
                        actionField?.isDisabled
                          ? actionField?.isDisabled(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx,
                              permissons
                            )
                          : false
                      }
                      className={`${actionField?.className ?? ""} `}
                      onClick={() =>
                        onClickActionField
                          ? btnLoaderData?.isLoading &&
                            btnLoaderData?.btnFieldName === actionField?.fieldId
                            ? () => {}
                            : onClickActionField(actionField?.fieldId, rowValue)
                          : () => {}
                      }
                      data-bs-toggle="tooltip"
                      data-bs-placement={`${
                        actionField?.titlePlacement
                          ? actionField?.titlePlacement
                          : "top"
                      }`}
                      title={`${rowValue[columnData.fieldName] ?? 0}`}
                    >
                      {rowValue[columnData.fieldName]}
                    </button>
                  ) : (
                    <button
                      key={actionFieldIndex}
                      disabled={
                        actionField?.isDisabled
                          ? actionField?.isDisabled(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx,
                              permissons
                            )
                          : false
                      }
                      onClick={() =>
                        onClickActionField
                          ? onClickActionField(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx
                            )
                          : () => {}
                      }
                      data-bs-toggle="tooltip"
                      data-bs-placement={`${
                        actionField?.titlePlacement
                          ? actionField?.titlePlacement
                          : "top"
                      }`}
                      className={`
                  ${
                    typeof actionField?.className === "string"
                      ? actionField?.className
                      : typeof actionField?.className === "function"
                      ? actionField?.className(
                          actionField?.fieldId,
                          rowValue,
                          rowIdx,
                          configData
                        )
                      : ""
                  }`}
                      title={`${
                        typeof actionField?.title === "string"
                          ? actionField?.title
                          : typeof actionField?.title === "function"
                          ? actionField?.title(
                              actionField?.fieldId,
                              rowValue,
                              rowIdx
                            )
                          : ""
                      }`}
                    >
                      <Image
                        src={
                          actionField?.dynamicButtonImageUrl
                            ? actionField?.dynamicButtonImageUrl(
                                actionField?.fieldId,
                                rowValue,
                                rowIdx,
                                permissons
                              )
                            : actionField?.buttonImageUrl
                        }
                        alt="eye"
                        width={actionField?.buttonImageWidth ?? 20}
                        height={actionField?.buttonImageHeight ?? 20}
                      />
                    </button>
                  )}
                </div>
              )
            );
          }
        )}
    </div>
  );
};

export default ActionComponent;
