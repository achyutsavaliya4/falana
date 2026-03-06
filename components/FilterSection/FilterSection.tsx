"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";

async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
interface FilterSection {
  filterColumn?: any[];
  clearAllFilter?: Function;
  clearFilter?: Function;
  onChangeSearch?: Function;
  selectedFilterValue?: any;
  onSelectValue?: Function;
  onSelectRange?: Function;
  valueData?: any;
  onClickFilterTitle?: Function;
  filterInputQuery?: any;
}

const FilterSection: React.FC<FilterSection> = ({
  filterColumn,
  clearAllFilter,
  clearFilter,
  onChangeSearch,
  selectedFilterValue,
  onSelectValue,
  onSelectRange,
  valueData,
  onClickFilterTitle,
  filterInputQuery,
}: FilterSection) => {
  const cursorFocusRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    cursorFocusRef?.current?.focus();
  }, []);

  return (
    <div className="">
      <div className="ps-3 filter-section d-flex poition-relative">
        {filterColumn?.map((columnData, columnInd) => {
          const dropdownTitle = (
            <span className="customTitle">
              {`${columnData.title}`}
              {!columnData?.isHideLabel && (
                <label>
                  {/* {`${
                    selectedFilterValue &&
                    (selectedFilterValue[columnData?.field]?.[
                      columnData.valueKey
                    ]
                      ? ": " +
                        selectedFilterValue[columnData.field]?.[
                          columnData.valueKey
                        ]
                      : selectedFilterValue[columnData.field]
                      ? ": " + selectedFilterValue[columnData.field]
                      : "")
                  }`} */}
                  {selectedFilterValue &&
                    (columnData.isMultiSelect
                      ? Array.isArray(selectedFilterValue[columnData.field]) &&
                        selectedFilterValue[columnData.field].length > 0
                        ? ": " +
                          selectedFilterValue[columnData.field]
                            .map((item: any) =>
                              columnData.valueKey
                                ? item[columnData.valueKey]
                                : typeof item === "string"
                                  ? item
                                  : JSON.stringify(item),
                            )
                            .join(", ")
                        : ""
                      : selectedFilterValue[columnData.field]?.[
                            columnData.valueKey
                          ]
                        ? ": " +
                          selectedFilterValue[columnData.field][
                            columnData.valueKey
                          ]
                        : selectedFilterValue[columnData.field]
                          ? ": " + selectedFilterValue[columnData.field]
                          : "")}
                </label>
              )}
              {columnData?.isCheckbox ? (
                selectedFilterValue?.[columnData.field] &&
                Object.keys(selectedFilterValue[columnData.field])?.length >
                  0 ? (
                  <label className="ps-2">
                    {Object.keys(selectedFilterValue[columnData.field])?.length}
                  </label>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </span>
          );
          if (columnData.field === "date_range") {
            const opened =
              selectedFilterValue &&
              selectedFilterValue[columnData.field]?.length !== 2;
            return (
              <>
                <div
                  key={"columnFilter" + columnInd}
                  className={`d-flex align-items-center filterBox filterBox-calender ${
                    selectedFilterValue &&
                    selectedFilterValue[columnData.field]?.length === 2
                      ? "filterBoxActive filterBoxActive-calender"
                      : ""
                  } ${
                    columnData?.isDisabled ||
                    (columnData?.onDisabled
                      ? columnData?.onDisabled(
                          columnData,
                          selectedFilterValue,
                          filterInputQuery,
                        )
                      : false)
                      ? "filterBox-Disabled"
                      : ""
                  }`}
                >
                  <label
                    htmlFor="date-picker"
                    style={{ color: "rgb(16, 24, 40)", fontWeight: "500" }}
                  >
                    {columnData.title}
                    {!opened ? ":" : ""}
                  </label>
                  <DatePicker
                    editable={false}
                    id="date-picker"
                    ref={columnData.ref ?? null}
                    value={
                      selectedFilterValue &&
                      selectedFilterValue[columnData.field]
                    }
                    range
                    numberOfMonths={2}
                    currentDate={
                      selectedFilterValue[columnData.field]
                        ? new DateObject(
                            selectedFilterValue[columnData.field]?.[0] ||
                              selectedFilterValue[columnData.field]?.[1],
                          )
                        : (new DateObject(columnData?.currentDate) ??
                          new DateObject())
                    }
                    onChange={(date) =>
                      onSelectRange &&
                      onSelectRange(
                        date,
                        columnData,
                        columnData?.dateFormat ?? "DD-MM-YYYY",
                      )
                    }
                    className={
                      columnData?.isMonthPicker ? "month-range-picker" : ""
                    }
                    style={{
                      color: "$primary",
                      background: "white",
                      border: "none",
                      boxShadow: "none",
                      width: opened ? "0" : "",
                    }}
                    format={columnData?.dateFormat ?? "DD-MM-YYYY"}
                    onlyMonthPicker={columnData?.isMonthPicker ?? false}
                    rangeHover={columnData?.rangeHover ?? true}
                    maxDate={columnData.maxDate ?? null}
                    minDate={columnData.minDate}
                    disabled={
                      columnData?.isDisabled ||
                      (columnData?.onDisabled
                        ? columnData?.onDisabled(
                            columnData,
                            selectedFilterValue,
                            filterInputQuery,
                          )
                        : false)
                    }
                    plugins={[
                      <Footer
                        key="footer"
                        position="top"
                        names={{
                          selectedDates: "",
                          from: "From: ",
                          to: "To: ",
                          separator: " - ",
                          selectDate: "",
                          close: "",
                        }}
                      />,
                    ]}
                  />
                  <label htmlFor="date-picker">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/calendar-plus-02.webp"
                      }
                      height={20}
                      width={20}
                      alt="Date Picker"
                      unoptimized={true}
                    />
                  </label>
                  {selectedFilterValue &&
                    selectedFilterValue[columnData.field] && (
                      <div className="ms-2">
                        <a
                          className="btn text-align d-flex align-items-center justify-content-center ps-2 pe-0 closeBtn"
                          onClick={() => clearFilter && clearFilter(columnData)}
                        >
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                              "/assets/icons/X.svg"
                            }
                            width={12}
                            height={20}
                            alt={"close"}
                            unoptimized={true}
                          />
                        </a>
                      </div>
                    )}
                </div>
              </>
            );
          } else if (
            columnData?.field === "single_date" ||
            columnData?.field === "till_date"
          ) {
            return (
              <div
                key={columnInd}
                className={`d-flex align-items-center filterBox filterBox-calender single-date-picker ${
                  columnData?.isDisabled ||
                  (columnData?.onDisabled
                    ? columnData?.onDisabled(
                        columnData,
                        selectedFilterValue,
                        filterInputQuery,
                      )
                    : false)
                    ? "filterBox-Disabled"
                    : ""
                }`}
              >
                <DatePicker
                  ref={cursorFocusRef ?? null}
                  value={
                    selectedFilterValue &&
                    new Date(selectedFilterValue[columnData.field]).getTime()
                  }
                  multiple={false}
                  numberOfMonths={1}
                  currentDate={
                    selectedFilterValue[columnData.field]
                      ? new DateObject(selectedFilterValue[columnData.field])
                      : (new DateObject(columnData?.currentDate) ??
                        new DateObject())
                  }
                  onChange={(date: any) => {
                    onSelectRange
                      ? onSelectRange(
                          date,
                          columnData,
                          columnData?.dateFormat ?? "DD-MM-YYYY",
                        )
                      : () => {};
                  }}
                  placeholder={columnData.title ?? "Date"}
                  className="commonform-datepicker form-control"
                  format={columnData?.dateFormat ?? "DD-MM-YYYY"}
                  rangeHover={columnData?.rangeHover ?? true}
                  onlyMonthPicker={columnData?.isMonthPicker ?? false}
                  maxDate={columnData?.maxDate ?? ""}
                  minDate={columnData?.minDate ?? ""}
                  disabled={
                    columnData?.isDisabled ||
                    (columnData?.onDisabled
                      ? columnData?.onDisabled(
                          columnData,
                          selectedFilterValue,
                          filterInputQuery,
                        )
                      : false)
                  }
                />

                <label
                  className={`datepicker-label d-flex`}
                  htmlFor={"date_picker"}
                >
                  <Image
                    height={17}
                    width={17}
                    alt="Date Picker"
                    src={
                      process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      "/assets/icons/calendar-plus-02.webp"
                    }
                    unoptimized={true}
                  />
                </label>
                {selectedFilterValue &&
                  selectedFilterValue[columnData.field] && (
                    <div className="ms-2">
                      <a
                        className="btn text-align d-flex align-items-center justify-content-center ps-2 pe-0 closeBtn"
                        onClick={() => clearFilter && clearFilter(columnData)}
                      >
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                            "/assets/icons/X.svg"
                          }
                          width={12}
                          height={20}
                          alt={"close"}
                          unoptimized={true}
                        />
                      </a>
                    </div>
                  )}
              </div>
            );
          } else if (columnData?.field === "input") {
            const dynamicProps =
              columnData?.inputType === "checkbox"
                ? {
                    type: "checkbox",
                    checked: Boolean(filterInputQuery?.[columnData?.fieldName]), // controlled by checked
                  }
                : {
                    type: "text",
                    value: filterInputQuery?.[columnData?.fieldName] ?? "",
                  };
            // 
            return (
              <div
                key={"columnFilter" + columnInd}
                className={`filterBox ${
                  columnData?.isDisabled ||
                  (columnData?.onDisabled
                    ? columnData?.onDisabled(
                        columnData,
                        selectedFilterValue,
                        filterInputQuery,
                      )
                    : false)
                    ? "filterBox-Disabled"
                    : ""
                }`}
              >
                <div className="custom-input d-flex align-items-center">
                  <input
                    {...dynamicProps}
                    className={`${
                      !columnData?.notApplyFormClass ? "form-control" : ""
                    } ${
                      typeof columnData?.className === "function"
                        ? columnData?.className(columnData, filterInputQuery)
                        : (columnData?.className ?? "")
                    }`}
                    key={"Input" + columnData?.field}
                    id={columnData?.fieldName}
                    name={columnData?.fieldName}
                    disabled={
                      columnData?.isDisabled ||
                      (columnData?.onDisabled
                        ? columnData?.onDisabled(
                            columnData,
                            selectedFilterValue,
                            filterInputQuery,
                          )
                        : false)
                    }
                    onKeyDown={(e) => {
                      columnData?.regexTest === "integer"
                        ? ["e", "E", "+", "-", "."].includes(e.key) &&
                          e.preventDefault()
                        : columnData?.inputType === "number"
                          ? ["e", "E", "+", "-"].includes(e.key) &&
                            e.preventDefault()
                          : () => {};
                    }}
                    ref={inputRef}
                    placeholder={columnData?.inputPlaceholder ?? ""}
                    aria-label={columnData?.inputType ?? "text"}
                    tabIndex={columnData?.tabIndex ?? null}
                    autoComplete="off"
                    aria-autocomplete="list"
                    // aria-expanded="false"
                    autoCapitalize="none"
                    onChange={(e: any) => {
                      onChangeSearch ? onChangeSearch(e, columnData) : () => {};
                    }}
                    min={columnData?.min}
                    max={columnData?.max}
                  />
                  <label
                    htmlFor={`${columnData?.fieldName}`}
                    style={{ color: "rgb(16, 24, 40)", fontWeight: "500" }}
                  >
                    {columnData.title}
                  </label>
                </div>
              </div>
            );
          } else if (columnData?.field === "checkbox") {
            return (
              <div
                key={"columnFilter" + columnInd}
                className={`filterBox ${
                  columnData?.isDisabled ||
                  (columnData?.onDisabled
                    ? columnData?.onDisabled(
                        columnData,
                        selectedFilterValue,
                        filterInputQuery,
                      )
                    : false)
                    ? "filterBox-Disabled"
                    : ""
                }`}
              >
                <div className="custom-input d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id={columnData.field ?? ""}
                    label={columnData.title ?? ""}
                    className="filter-checkbox"
                    checked={Boolean(filterInputQuery?.[columnData?.fieldName])}
                    onChange={(e: any) => {
                      onChangeSearch ? onChangeSearch(e, columnData) : () => {};
                    }}
                  />
                </div>
              </div>
            );
          } else if (!columnData.isHidden) {
            return (
              <div
                key={"columnFilter" + columnInd}
                className={`filterBox ${
                  selectedFilterValue && selectedFilterValue[columnData.field]
                    ? "filterBoxActive"
                    : ""
                } ${
                  columnData?.isDisabled ||
                  (columnData?.onDisabled
                    ? columnData?.onDisabled(
                        columnData,
                        selectedFilterValue,
                        filterInputQuery,
                      )
                    : false)
                    ? "filterBox-Disabled"
                    : ""
                }`}
              >
                <DropdownButton
                  id="dropdown-item-button"
                  className="custom-select sorting-section-filter"
                  title={dropdownTitle}
                  onClick={async () => {
                    onClickFilterTitle?.(columnData, columnInd);
                    await sleep(500);
                    const idInput = document.getElementById(
                      "drop-down-input-cursor-active" + columnData?.field,
                    );
                    if (idInput) {
                      idInput.focus();
                    }
                  }}
                  disabled={
                    columnData?.isDisabled ||
                    (columnData?.onDisabled
                      ? columnData?.onDisabled(
                          columnData,
                          selectedFilterValue,
                          filterInputQuery,
                        )
                      : false)
                  }
                >
                  {columnData.isSearchable ? (
                    <>
                      <div className="input-group p-2">
                        <div className="input-group-text py-1 px-2">
                          <Image
                            width={14}
                            height={14}
                            src={
                              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                              "/assets/icons/search.svg"
                            }
                            alt="search-icon"
                            className=""
                            unoptimized={true}
                          />
                        </div>
                        <input
                          type="text"
                          id={
                            "drop-down-input-cursor-active" + columnData?.field
                          }
                          className="form-control px-0 dropdown-item-search"
                          placeholder="Search..."
                          autoComplete="off"
                          aria-autocomplete="list"
                          // aria-expanded="false"
                          autoCapitalize="none"
                          onChange={(e) =>
                            onChangeSearch && onChangeSearch(e, columnData)
                          }
                          ref={cursorFocusRef}
                        />
                      </div>
                    </>
                  ) : null}

                  {valueData
                    ? valueData[columnData.field]?.length > 0
                      ? valueData[columnData.field]?.map(
                          (val: any, ind: number) => {
                            const dropdownval = columnData.valueKey
                              ? val[columnData.valueKey]
                              : val;
                            const str = dropdownval
                              ? dropdownval?.length > 20
                                ? dropdownval.slice(0, 20) + "..."
                                : dropdownval
                              : "";

                            return columnData.isMultiSelect ? (
                              <Dropdown.Item
                                key={"multi" + ind}
                                className="text-dark px-2 mt-1 filter-dropdown text-truncate"
                                onClick={() => {
                                  const currentValues =
                                    selectedFilterValue[columnData.field] || [];
                                  const valueKey = columnData.selectValue
                                    ? val[columnData.selectValue]
                                    : val;
                                  const exists = currentValues.some(
                                    (item: any) =>
                                      (columnData.selectValue
                                        ? item[columnData.selectValue]
                                        : item) === valueKey,
                                  );
                                  const newSelected = exists
                                    ? currentValues.filter(
                                        (item: any) =>
                                          (columnData.selectValue
                                            ? item[columnData.selectValue]
                                            : item) !== valueKey,
                                      )
                                    : [...currentValues, val];

                                  onSelectValue &&
                                    onSelectValue(newSelected, columnData);
                                }}
                              >
                                <Form.Check
                                  type="checkbox"
                                  id={
                                    columnData.valueKey
                                      ? val[columnData.valueKey]
                                      : JSON.stringify(val)
                                  }
                                  label={
                                    typeof val[columnData.valueKey] === "string"
                                      ? val[columnData.valueKey]
                                      : JSON.stringify(
                                          val[columnData.valueKey] || val,
                                        )
                                  }
                                  className="radioButton"
                                  checked={
                                    Array.isArray(
                                      selectedFilterValue[columnData.field],
                                    ) &&
                                    selectedFilterValue[columnData.field].some(
                                      (item: any) =>
                                        (columnData.selectValue
                                          ? item[columnData.selectValue]
                                          : item) ===
                                        (columnData.selectValue
                                          ? val[columnData.selectValue]
                                          : val),
                                    )
                                  }
                                />
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item
                                key={"va" + ind}
                                className="text-dark px-2 mt-1 filter-dropdown text-truncate"
                                onClick={() => {
                                  if (onSelectValue) {
                                    onSelectValue(val, columnData);
                                    if (
                                      cursorFocusRef &&
                                      cursorFocusRef.current
                                    ) {
                                      cursorFocusRef.current.value = "";
                                    }
                                  }
                                }}
                              >
                                <Form.Check
                                  type={
                                    columnData?.isCheckBox
                                      ? "checkbox"
                                      : "radio"
                                  }
                                  id={
                                    columnData.valueKey
                                      ? val[columnData.valueKey]
                                      : val
                                  }
                                  label={str}
                                  className="radioButton"
                                  checked={
                                    columnData?.isCheckBox
                                      ? Array.isArray(
                                          selectedFilterValue[columnData.field],
                                        ) &&
                                        selectedFilterValue[
                                          columnData.field
                                        ].includes(val)
                                      : (columnData.valueKey
                                            ? val[columnData.valueKey]
                                            : val) ==
                                          (selectedFilterValue[columnData.field]
                                            ? (selectedFilterValue[
                                                columnData.field
                                              ][columnData.valueKey] ??
                                              selectedFilterValue[
                                                columnData.field
                                              ])
                                            : selectedFilterValue[
                                                columnData.field
                                              ])
                                        ? true
                                        : false
                                  }
                                />
                              </Dropdown.Item>
                            );
                          },
                        )
                      : ""
                    : ""}
                </DropdownButton>
                {selectedFilterValue &&
                  selectedFilterValue[columnData.field] && (
                    <a
                      className={`btn d-flex align-items-center text-align justify-content-center closeBtn`}
                      onClick={() => {
                        if (
                          columnData?.onDisabled
                            ? !columnData?.onDisabled(
                                columnData,
                                selectedFilterValue,
                                filterInputQuery,
                              )
                            : columnData?.isDisabled
                              ? false
                              : true
                        ) {
                          clearFilter && clearFilter(columnData);
                        }
                      }}
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                          "/assets/icons/cross_coloured.svg"
                        }
                        width={7}
                        height={7}
                        alt={"close"}
                        unoptimized={true}
                      />
                    </a>
                  )}
              </div>
            );
          }
        })}
        <div className="col-1 d-flex justify-content-start align-items-center text-align p-0">
          <a
            className="clearFilter"
            onClick={(e) => {
              clearAllFilter && clearAllFilter(e);
              if (inputRef && inputRef?.current) {
                inputRef.current.value = "";
              }
            }}
          >
            Clear
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
