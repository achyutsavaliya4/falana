import { Fragment, useState } from "react";
import { Spinner, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "next/image";
import debounce from "@/utils/debounce";
import ActionComponent from "../ActionComponent/ActionComponent";

interface GridTable {
  data?: any[];
  columns?: any[];
  configData?: any;
  footerSummary?: any[];
  // onTableClickRow?: Function;
  noDataHeadingMessage?: string;
  noDataMessage?: string;
  noDataSectionClassName?: string;
  onRowClick?: Function;
  onRowDoubleClick?: Function;
  field?: any;
  onClickActionField?: (
    fieldId: string,
    rowValue: any,
    rowIdx?: number,
    parentRowIdx?: number
  ) => void;
  tableRowClassName?: any;
  // isStickyHeader?: boolean;
  onChangeActionField?: Function;
  onBlurActionField?: Function;
  expandControlClick?: (
    rowValue: any,
    showMore: boolean,
    expandKey?: string,
    actionField?: any,
    rowIdx?: number
  ) => void;

  // mui searchable
  // groupChildIndex?: number;
  onChangeSearch?: Function;
  fieldData?: any;
  fullFieldData?: any;
  // onSearchSelect?: Function;
  // onClearSelection?: Function;
  // isCheckValid?: boolean;
  // onCheck?: Function;
  // disabledOptions?: Function;
  // onClickAdd?: Function;
  // onNewOptionCreate?: Function;
  // muiData?: any[];
  subColumns?: any[];
  // handleOnChangeQuantity?: Function;
  loader?: boolean;
  // newProduct?: boolean;
  errors?: any;
  tableHeaderClassName?: any;
  hideNoDataSection?: boolean;
  showSubcolumnsHead?: boolean;
  tableBodyClassName?: string;
  // handleOnOpenMui?: any;
  // onClickDropdown?: any;
  // onClickMuiField?: any;
}

const GridTable: React.FC<GridTable> = ({
  data,
  columns,
  configData,
  // onTableClickRow,
  footerSummary,
  noDataHeadingMessage,
  noDataMessage,
  noDataSectionClassName,
  onRowClick,
  onRowDoubleClick,
  field,
  onClickActionField,
  onChangeActionField,
  onBlurActionField,
  tableRowClassName,
  // isStickyHeader,

  // groupChildIndex,
  onChangeSearch,
  fieldData,
  fullFieldData,
  // onSearchSelect,
  // onClearSelection,
  // isCheckValid,
  // onCheck,
  // disabledOptions,
  // onNewOptionCreate,
  // onClickAdd,
  // muiData,
  subColumns,
  // handleOnChangeQuantity,
  loader,
  // newProduct,
  errors,
  tableHeaderClassName,
  hideNoDataSection,
  showSubcolumnsHead,
  tableBodyClassName,
  // handleOnOpenMui,
  // onClickDropdown,
  // onClickMuiField,
  expandControlClick
}) => {
  const [hoverData, setHoverData] = useState<{
    isHover: boolean;
    backgroundColor?: string;
    idx: number | string;
    onFocus?: any;
  }>({
    isHover: false,
    idx: "",
  });

  // const { isLoadingTableData } = useSelector((state) => state.loader);
  // TODO:- make use of redux for this flag
  const isLoadingTableData = false;
  const onMouseLeave = () => {
    if (!hoverData?.onFocus) {
      setHoverData({ isHover: false, idx: "" });
    }
  };
  const onMouseEnter = (idx: string | number, color: string) => {
    setHoverData({
      isHover: true,
      idx: idx,
      backgroundColor: color,
    });
  };
  // mui
  const muiSearchDebounce = debounce(
    onChangeSearch ? onChangeSearch : () => {}
  );

  const renderTooltip = (messages: any) => (
    <Tooltip id="button-tooltip" className={`${"error-tooltip"}`} {...messages}>
      {messages}
    </Tooltip>
  );

  return (
    <div
      className={`grid-table-main ${
        isLoadingTableData && loader ? "loader" : ""
      }`}
    >
      <div className={`${"grid-table-wrapper"}`}>
        <table className={`${"grid-table w-100"}`}>
          <thead
            className={`${"grid-table-head"} ${tableHeaderClassName ?? ""} ${
              field?.isStickyHeader ? "position-sticky sticky-top" : ""
            }`}
          >
            <tr className={`${"px-3"}`}>
              {columns?.map((val: any, idx: number) => {
                return (
                  <th
                    key={idx + "123"}
                    className={`grid-table-head-cell py-1 ${
                      val?.thClassName ?? "px-2"
                    } ${idx === 0 ? "ps-3" : ""}${
                      columns?.length - 1 === idx ? "pe-3" : ""
                    }`}
                    style={{ width: val.width ?? "" }}
                  >
                    <div
                      className={`${
                        val.tdHeaderChildClassName ??
                        "d-flex justify-content-start align-items-center"
                      }`}
                    >
                      {val?.customHeader
                        ? val?.customHeader(val, fieldData, fullFieldData)
                        : val?.headerName ?? ""}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={`grid-table-body ${tableBodyClassName}`}>
            {data && data?.length ? (
              data?.map((rowValue: any, rowIdx: number) => {
                return (
                  <Fragment key={"tableRow" + rowIdx}>
                    <tr
                      key={rowIdx}
                      style={{
                        backgroundColor:
                          rowIdx === hoverData?.idx
                            ? `${hoverData?.backgroundColor}`
                            : "initial",
                        cursor: rowIdx === hoverData?.idx ? "pointer" : "",
                      }}
                      onClick={(e) => {
                        rowValue?.handleRowClick
                          ? rowValue?.handleRowClick?.(rowValue, rowIdx)
                          : onRowClick?.(rowIdx, field, rowValue);
                      }}
                      onDoubleClick={() => {
                        onRowDoubleClick?.(rowIdx, field, rowValue);
                      }}
                      className={`${
                        typeof tableRowClassName === "function"
                          ? tableRowClassName(
                              rowValue,
                              rowIdx,
                              fullFieldData
                            ) ?? ""
                          : tableRowClassName
                      } main-data-row   `}
                    >
                      {columns?.map((columnValue: any, columnIdx: number) => {
                        if (columnValue?.isShow !== false) {
                          return (
                            <td
                              onClick={() =>
                                columnValue?.handleRowClick?.(rowValue, rowIdx)
                              }
                              className={`${
                                typeof columnValue?.tdClassName === "string"
                                  ? columnValue?.tdClassName ?? "px-1"
                                  : typeof columnValue?.tdClassName ===
                                    "function"
                                  ? columnValue?.tdClassName(
                                      rowValue,
                                      rowIdx,
                                      fullFieldData
                                    ) ?? ""
                                  : ""
                              } ${
                                columnValue?.noStartPadding
                                  ? ""
                                  : columnIdx === 0
                                  ? "ps-3"
                                  : ""
                              }${
                                columnIdx === columns?.length - 1 ? "pe-3" : ""
                              } `}
                              key={columnIdx + "123"}
                              onMouseEnter={() => {
                                columnValue?.isHoverable
                                  ? onMouseEnter(
                                      rowIdx,
                                      typeof columnValue?.hoverColor ===
                                        "function"
                                        ? columnValue?.hoverColor(
                                            rowValue,
                                            rowIdx
                                          )
                                        : columnValue?.hoverColor ??
                                            "rgba(124, 124, 124,0.5)"
                                    )
                                  : () => {};
                              }}
                              onMouseLeave={() => {
                                columnValue?.isHoverable
                                  ? onMouseLeave()
                                  : () => {};
                              }}
                              style={{
                                paddingBottom:
                                  footerSummary && footerSummary?.length > 0
                                    ? `${
                                        data?.length < 8 &&
                                        data?.length - 1 === rowIdx
                                          ? 23 - (data?.length + 2) + "vh"
                                          : ""
                                      }`
                                    : "",
                              }}
                            >
                              {columnValue?.isActionColumn ? (
                                <ActionComponent
                                  columnData={columnValue}
                                  rowValue={rowValue}
                                  data={data}
                                  onClickActionField={onClickActionField}
                                  onChangeActionField={onChangeActionField}
                                  onBlurActionField={onBlurActionField}
                                  configData={configData}
                                  rowIdx={rowIdx}
                                  columnIdx={columnIdx}
                                  fullFieldData={fullFieldData}
                                  expandControlClick={expandControlClick}
                                />
                              ) : columnValue?.field !== "mui" &&
                                columnValue?.customField ? (
                                <div
                                  className={`${
                                    columnValue?.tdChildClassName ?? ""
                                  }`}
                                >
                                  {columnValue?.customField
                                    ? columnValue.customField(
                                        columnValue?.field,
                                        columnValue,
                                        rowValue,
                                        rowIdx,
                                        data,
                                        configData,
                                        errors,
                                        fullFieldData
                                      )
                                    : rowValue[columnValue?.field]}
                                </div>
                              ) : (
                                <>
                                  {rowValue?.[
                                    columnValue?.field
                                      ? columnValue?.field
                                      : columnValue?.fieldName
                                  ] ?? ""}
                                </>
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                    {rowValue?.rowClick && (
                      <tr className="border-none subtable-row">
                        <td
                          colSpan={columns?.length && columns?.length}
                          style={{
                            backgroundColor: "#EFF4FF",
                            borderTop: "1px solid #d0d5dd",
                            borderBottom: "1px solid #d0d5dd",
                          }}
                          className={`${"p-0 sub-table-column"}`}
                        >
                          <table className={`${"grid-table w-100"}`}>
                            {showSubcolumnsHead && (
                              <thead
                                className={`${"grid-table-head"} ${
                                  tableHeaderClassName ?? ""
                                } ${
                                  field?.isStickyHeader
                                    ? "position-sticky sticky-top"
                                    : ""
                                }`}
                              >
                                <tr className={`${"px-3"}`}>
                                  {subColumns?.map((val: any, idx: number) => {
                                    return (
                                      <th
                                        key={idx + "123"}
                                        className={`grid-table-head-cell ${
                                          val?.thClassName ?? "px-2"
                                        } ${idx === 0 ? "ps-3" : ""}${
                                          subColumns?.length - 1 === idx
                                            ? "pe-3"
                                            : ""
                                        }`}
                                        style={{ width: val.width ?? "" }}
                                      >
                                        <div
                                          className={`${
                                            val.tdHeaderChildClassName ??
                                            "d-flex justify-content-start align-items-center"
                                          }`}
                                        >
                                          {val?.customHeader
                                            ? val?.customHeader(
                                                val,
                                                fieldData,
                                                fullFieldData
                                              )
                                            : val?.headerName ?? ""}
                                        </div>
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                            )}
                            <tbody className="grid-table-body">
                              {rowValue?.batchesCopy &&
                              rowValue?.batchesCopy?.length ? (
                                rowValue?.batchesCopy?.map(
                                  (rowValue: any, rowI: number) => {
                                    return (
                                      <tr
                                        key={rowI}
                                        style={{
                                          backgroundColor:
                                            rowI === hoverData?.idx
                                              ? `${hoverData?.backgroundColor}`
                                              : "initial",
                                          cursor:
                                            rowI === hoverData?.idx
                                              ? "pointer"
                                              : "",
                                        }}
                                        onClick={(e) => {
                                          onRowClick?.(rowI, field, rowValue);
                                        }}
                                        onDoubleClick={() => {
                                          onRowDoubleClick?.(
                                            rowI,
                                            field,
                                            rowValue
                                          );
                                        }}
                                        className={`main-data-row ${
                                          typeof tableRowClassName ===
                                          "function"
                                            ? tableRowClassName(
                                                rowValue,
                                                rowIdx,
                                                fullFieldData
                                              ) ?? ""
                                            : tableRowClassName
                                        }`}
                                      >
                                        {subColumns?.map(
                                          (
                                            columnValue: any,
                                            columnIdx: number
                                          ) => {
                                            if (columnValue?.isShow !== false) {
                                              return (
                                                <td
                                                  className={`${
                                                    typeof columnValue?.tdClassName ===
                                                    "string"
                                                      ? columnValue?.tdClassName ??
                                                        "px-1"
                                                      : typeof columnValue?.tdClassName ===
                                                        "function"
                                                      ? columnValue?.tdClassName(
                                                          rowValue,
                                                          rowI,
                                                          fullFieldData
                                                        ) ?? ""
                                                      : ""
                                                  } ${
                                                    columnValue?.noStartPadding
                                                      ? ""
                                                      : columnIdx === 0
                                                      ? "ps-3"
                                                      : ""
                                                  }`}
                                                  key={columnIdx + "123"}
                                                  onMouseEnter={() => {
                                                    columnValue?.isHoverable
                                                      ? onMouseEnter(
                                                          rowI,
                                                          typeof columnValue?.hoverColor ===
                                                            "function"
                                                            ? columnValue?.hoverColor(
                                                                rowValue,
                                                                rowI
                                                              )
                                                            : columnValue?.hoverColor ??
                                                                "rgba(124, 124, 124,0.5)"
                                                        )
                                                      : () => {};
                                                  }}
                                                  onMouseLeave={() => {
                                                    columnValue?.isHoverable
                                                      ? onMouseLeave()
                                                      : () => {};
                                                  }}
                                                  style={{
                                                    paddingBottom:
                                                      footerSummary &&
                                                      footerSummary?.length > 0
                                                        ? `${
                                                            data?.length < 8 &&
                                                            data?.length - 1 ===
                                                              rowI
                                                              ? 23 -
                                                                (data?.length +
                                                                  2) +
                                                                "vh"
                                                              : ""
                                                          }`
                                                        : "",
                                                    width:
                                                      columnValue.width ?? "",
                                                  }}
                                                >
                                                  {columnValue?.isActionColumn ? (
                                                    <ActionComponent
                                                      columnData={columnValue}
                                                      rowValue={rowValue}
                                                      data={
                                                        rowValue?.batchesCopy
                                                      }
                                                      onClickActionField={
                                                        onClickActionField
                                                      }
                                                      onChangeActionField={
                                                        onChangeActionField
                                                      }
                                                      onBlurActionField={
                                                        onBlurActionField
                                                      }
                                                      configData={configData}
                                                      rowIdx={rowI}
                                                      columnIdx={columnIdx}
                                                      parentRowIdx={rowIdx}
                                                    />
                                                  ) : columnValue?.field !==
                                                      "mui" &&
                                                    columnValue?.customField ? (
                                                    <div
                                                      className={`${
                                                        columnValue?.tdChildClassName ??
                                                        ""
                                                      }`}
                                                    >
                                                      {columnValue?.customField
                                                        ? columnValue.customField(
                                                            columnValue?.field,
                                                            columnValue,
                                                            rowValue,
                                                            rowI,
                                                            data,
                                                            configData,
                                                            rowIdx,
                                                            fullFieldData
                                                          )
                                                        : rowValue[
                                                            columnValue?.field
                                                          ]}
                                                    </div>
                                                  ) : (
                                                    <>
                                                      {rowValue?.[
                                                        columnValue?.field
                                                          ? columnValue?.field
                                                          : columnValue?.fieldName
                                                      ] ?? ""}
                                                    </>
                                                  )}
                                                </td>
                                              );
                                            }
                                          }
                                        )}
                                      </tr>
                                    );
                                  }
                                )
                              ) : (
                                <tr className="no-data-section">
                                  <td colSpan={columns ? columns.length : 5}>
                                    {isLoadingTableData ? (
                                      <div className="dynamic-table-loader">
                                        <Spinner
                                          animation="border"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </Spinner>
                                      </div>
                                    ) : (
                                      <div
                                        className={`no-data-section text-center d-flex flex-column justify-content-center align-items-center ${noDataSectionClassName}`}
                                      >
                                        <div className="d-flex w-100 justify-content-center">
                                          <Image
                                            src={
                                              process.env
                                                .NEXT_PUBLIC_IMAGES_ASSETS +
                                              "/assets/icons/no-data-table_new.webp"
                                            }
                                            width={48}
                                            height={48}
                                            alt="Close Icon"
                                            className="m-0 p-0 no-data-img"
                                            unoptimized={true}
                                          />
                                        </div>
                                        <div className="no-data-heading-message">
                                          {noDataHeadingMessage ?? "No Data"}
                                        </div>
                                        <div className="no-data-message">
                                          {noDataMessage ??
                                            "You do not have any data. Please try again or create add a new."}
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            ) : hideNoDataSection ? (
              <></>
            ) : (
              <tr className="no-data-section">
                <td colSpan={columns ? columns.length : 5}>
                  {isLoadingTableData ? (
                    <div className="dynamic-table-loader">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : fullFieldData?.customNoDataSection ? (
                    fullFieldData?.customNoDataSection()
                  ) : (
                    <div
                      className={`no-data-section text-center d-flex flex-column justify-content-center align-items-center ${noDataSectionClassName}`}
                    >
                      <div className="d-flex w-100 justify-content-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                            "/assets/icons/no-data-table_new.webp"
                          }
                          width={48}
                          height={48}
                          alt="Close Icon"
                          className="m-0 p-0 no-data-img"
                          unoptimized={true}
                        />
                      </div>
                      <div className="no-data-heading-message">
                        {noDataHeadingMessage ?? "No Data"}
                      </div>
                      <div className="no-data-message">
                        {noDataMessage ??
                          "You do not have any data. Please try again or create add a new."}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
          {footerSummary && (
            <tfoot
              className={`p-0 m-0 mt-2 grid-table-footer ${field?.footerClassName}`}
            >
              <tr
                style={{
                  background: "#E4F6EE",
                  padding: "10px 8px !important",
                }}
              >
                {footerSummary?.map((val: any, idx: number) => {
                  return (
                    <td
                      key={idx}
                      colSpan={val?.colSpan}
                      className={val?.tdClassName}
                      style={{ width: val?.width ?? "" }}
                    >
                      {val?.customField ? (
                        val.customField(
                          configData?.tableSummaryData
                            ? configData?.tableSummaryData
                            : {}
                        )
                      ) : (
                        <></>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
export default GridTable;
