import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ValidationTooltip from "../ValidationTooltip/ValidationTooltip";
import clsx from "clsx";
import Input from "../Input/Input";
import Loader from "../Loader/Loader";
import { checkArray } from "@/commonJS/commonHelper/commonHelper";
import Image from "next/image";
type value = string | Record<string, any> | Record<string, any>[];
export type SearchFieldProps<
  TField = any,
  TConfig = Record<string, any>,
> = {
  onChangeSearch?: (value: string) => void;
  onSearchSelect: (item: value, field: SearchableSelectFieldProps) => void;
  onRemoveSelect?: (item: value, field: SearchableSelectFieldProps,repeatChildIndex: number,idx?: number) => void;

  field?: TField;

  configData?: TConfig; // default = {}

  onClickAdd?: () => void;
  isCheckValid?: boolean;

  customNoDataMessage?: string;

  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlurInput?: (e: React.FocusEvent<HTMLInputElement>) => void;

  fieldData?: Record<string, any>;
  fullFieldData?: any;

  errors?: Record<string, string | undefined>;

  fieldIndex: number;
  isLoading: boolean;
  repeatChildIndex?: number;
};

export interface SearchableSelectFieldProps {
  id?: string;
  fieldName: string;
  inputType?: "text" | "number";
  searchbleClass?: string;
  as:
    | "select"
    | "search-select"
    | "multi-select"
    | "multi-search-select"
    | ((field: any, fieldData?: any, fullFieldData?: any, configData?: any) => string);
  className?: string | ((field: any, fieldData?: any, fullFieldData?: any, configData?: any) => string);
  placeholder?: string;
  optionKey?: string;
  customField?: (item: any) => string;
  customValue?: (value: any) => string;
  validation?: (value: value) => { isValid: boolean; message: string };
  isDisabled?: boolean;
  onDisabled?: (field: any, fieldData?: any, fullFieldData?: any, configData?: any) => boolean;
  title?: string;
}

// const focusNextElement = (tabIndex) => {
//   var tabbables = document.querySelectorAll(".tabable");
//   for (var i = 0; i < tabbables.length; i++) {
//     if (tabbables[i].tabIndex == tabIndex + 1) {
//       tabbables[i].focus();
//       break;
//     }
//   }
// };

export const MenuItems = ({
  field,
  isLoading,
  dropdownData,
  customNoDataMessage,
  onSearchSelect,
  repeatChildIndex
}: {
  field: SearchableSelectFieldProps;
  isLoading: boolean;
  dropdownData: value[];
  customNoDataMessage?: string;
  onSearchSelect: (item: value, field: SearchableSelectFieldProps, repeatChildIndex?: number) => void;
  repeatChildIndex?: number;
}) => {
  if (isLoading) {
    return <Loader />;
  } else if (checkArray(dropdownData)) {
    return (
      <div className="searchable-main-div" style={{ maxHeight: "260px" }}>
        {dropdownData?.map((val: any, i: number) => {
          const renderValue = field?.customField
            ? field?.customField(val)
            : field?.optionKey
              ? val?.[field?.optionKey]
              : val;

          return (
            <Dropdown.Item
              key={`${JSON.stringify(renderValue)}-${i}`}
              className="w-100 dropdown-item my-1 py-1 px-2 mx-0"
              onClick={() => {
                onSearchSelect?.(val, field, repeatChildIndex);
                // focusNextElement(tabIndex);
                // setSearchFlag(false);
              }}
              as="button"
            >
              {typeof renderValue === "string" && renderValue}
            </Dropdown.Item>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center px-2 mt-1"
      style={{ minWidth: "inherit" }}
    >
      {customNoDataMessage ? customNoDataMessage : "No Data"}
    </div>
  );
};

const SearchableSelect = ({
  onChangeSearch,
  onSearchSelect,
  onRemoveSelect,
  field,
  isLoading = false,
  configData = {},
  // onClickAdd,
  isCheckValid = false,
  customNoDataMessage,
  onKeyDown,
  onBlurInput,
  fieldData,
  fullFieldData,
  errors,
  fieldIndex,
  repeatChildIndex
}: SearchFieldProps<SearchableSelectFieldProps>) => {
  const [search, setSearch] = useState("");
  const [searchFlag, setSearchFlag] = useState("");
  const [show, setShow] = useState<boolean>(false);
  // const value = fieldData?.[field?.fieldName] || {};
  // const isMulti = field?.as === "multi-select" || field?.as === "multi-search-select";
  const resolvedAs =
  typeof field?.as === "function"
    ? field?.as(field, fieldData, fullFieldData, configData)
    : field?.as;

const isMulti =
  resolvedAs === "multi-select" || resolvedAs === "multi-search-select";

  const value = fieldData?.[field?.fieldName ?? ''] || (isMulti ? [] : {});
  // const renderValue = () => {
  //   if (isMulti) return "";
  //   return field?.customValue
  //     ? field?.customValue(value)
  //     : field?.optionKey
  //       ? value?.[field?.optionKey]
  //       : (value as any)?.[field?.optionKey]
  //       ? value
  //       : ""
  // };
  const renderValue = () =>
  isMulti
    ? ""
    : field?.customValue
      ? field.customValue(value)
      : field?.optionKey
        ? (value as any)?.[field.optionKey] ?? ""
        : value ?? "";

const dropdownData = field?.fieldName
    ? configData[field?.fieldName] || []
    : [];
  const disabled = field?.onDisabled
    ? field?.onDisabled(field, fieldData, fullFieldData, configData)
    : field?.isDisabled;
  const isValidData = !!field?.validation?.(value)?.isValid;
  // useEffect(() => {
  //   if (searchFlag && search !== "") {
  //     setShow(true);
  //   }
  // }, [search, searchFlag]);
  useEffect(() => {
    if (isMulti) return;
  const val = fieldData?.[field?.fieldName ?? ''];

  if (val) {
    const displayValue = field?.customValue
      ? field?.customValue(val)
      : field?.optionKey
        ? val[field?.optionKey]
        : val;

    setSearch(displayValue as string);
  } else {
    setSearch("");
  }
// }, [fieldData, field]);
}, [fieldData, field, isMulti]);

return (
    <Dropdown
      drop="down"
      className={clsx(
        "searchable-select",
        isCheckValid && !disabled && !isValidData && "on-fail-validation",
        field?.searchbleClass,
      )}
    >
      <Dropdown.Toggle
        className="searchable-select-button"
        disabled={disabled}
        tabIndex={-1}
      >
        <div
          className={clsx(
            "d-flex w-100 input-wrapper",
            isMulti && "flex-wrap align-items-center gap-1 p-1",
            isCheckValid && !disabled && !isValidData && "fail-validation",
          )}
        >
          {isMulti &&
            checkArray(value) &&
            value.map((item: any, idx: number) => {
              const displayVal = field?.customField
                ? field?.customField(item)
                : field?.optionKey
                  ? item?.[field?.optionKey]
                  : item;
              return (
                <div
                  key={idx}
                  // className="badge bg-secondary text-white d-flex align-items-center p-1"
                  className="multi-select-chip"
                >
                  <span className="chip-text me-1">{typeof displayVal === "string" ? displayVal : JSON.stringify(displayVal)}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSelect?.(item, field!, repeatChildIndex ?? 0, idx);
                    }}
                  >
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/cross-black.svg"}
                      alt="cross"
                      width={12}
                      height={12}
                    />
                  </span>
                </div>
              );
            })}
          <Input
            field={{
              ...field,
              className: clsx(
                "searchable-select-input",
                field?.className,
                (field?.as === "select" || field?.as === "multi-select") &&
                  "as-dropdown",
              ),
              readOnly: field?.as === "select" || field?.as === "multi-select",
              title: renderValue(),
            }}
            fieldIndex={fieldIndex}
            // fieldData={{ [field?.fieldName]: renderValue() }}
            fieldData={{ [field?.fieldName ?? '']: search }}
            onChangeInput={(e) => {
              const val = e?.target?.value;
              // setSearch(e?.target?.value)
              setSearch(val);
              onChangeSearch?.(val);
              // setSearchFlag(true);
              setShow(true);
            }}
            onBlurInput={(e) => {
              onBlurInput?.(e as any);
              setShow(false);
            }}
            onKeyDown={(e) => {
              if (searchFlag) {
                onKeyDown?.(e);
              }
            }}
          />

          <ValidationTooltip
            isCheckValid={isCheckValid}
            bodyChild={field}
            fieldData={fieldData}
            fullFieldData={fullFieldData}
            errors={errors}
          />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={clsx("searchable-menu", show === true && "show")}
        style={{
          position: "fixed",
          width: "fit-content",
          zIndex: 999,
          inset: "none",
          transform: "none",
        }}
        id="dropDownMenuField"
        show={show}
      >
        <MenuItems
          field={field!}
          dropdownData={dropdownData}
          isLoading={isLoading}
          customNoDataMessage={customNoDataMessage}
          onSearchSelect={(item, field, repeatChildIndex) => {
            (onSearchSelect as any)(item, field, repeatChildIndex);
            if (isMulti) setSearch("");
          }}
          repeatChildIndex={repeatChildIndex}
        />
        {/* {field?.isAddAvailable && (
          <div>
            <button
              className="btn btn-outline-primary py-1 px-2 dropdown-btn border"
              onClick={() => onClickAdd()}
            >
              {field.addAvailableText}
            </button>
          </div>
        )} */}
        {/* {field?.isCreateNew && (
          <Dropdown.Item
            className="py-1 px-2 create-item mt-2"
            onClick={() => {
              onSearchSelect?.(
                {
                  id: searchFlag ? search : "",
                  batch_number: searchFlag ? search : "",
                },
                field,
                configData,
              );
              focusNextElement(tabIndex);
              setSearch("");
              // setSearchFlag(false);
            }}
          >
            {` + Create New ${(
              field.fieldName.charAt(0).toUpperCase() + field.fieldName.slice(1)
            )
              .toString()
              .trim()} ${search ? '"' + search + '"' : ""}`}
          </Dropdown.Item>
        )} */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchableSelect;
