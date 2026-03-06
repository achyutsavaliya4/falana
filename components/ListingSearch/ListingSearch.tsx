import Image from "next/image";
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

type arrayData = any[] | [];

type searchDropdown = {
  title: string;
  field: string;
  isHide?: boolean;
  placeholder?: string;
  inputType?: string;
  isRequiredField?: boolean;
  messageForValidation?: Function;
};
interface ListingSearch {
  dropdownData?: searchDropdown[] | [];
  isDropdownPresent?: boolean;
  selectColumnSearch?: searchDropdown;
  onSelectColumn?: Function;
  onChangeSearch?: Function;
  searchResults?: arrayData;
  onSearchSelect?: Function;
  searchDropdownLabel?: string;
  innerSearchValue?: string;
  isDisabled?: boolean;
  customPlaceHolder?: string;
  customFieldDropdown?: Function;
  isRequiredField?: boolean;
  onBlurSearch?: Function;
}

const ListingSearch: React.FC<ListingSearch> = ({
  dropdownData,
  isDropdownPresent,
  selectColumnSearch,
  onSelectColumn,
  onChangeSearch,
  searchResults,
  onSearchSelect,
  searchDropdownLabel,
  innerSearchValue,
  isDisabled,
  customPlaceHolder,
  customFieldDropdown,
  isRequiredField,
  onBlurSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const dropdownRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    document.addEventListener(
      "click",
      function handleClickOutsideBox(event: MouseEvent) {
        const box = document.getElementById("box");
        const target = event.target as HTMLElement;
        if (box) {
          if (!box.contains(target) && target.id !== "navbarFormList") {
            box.style.display = "none";
          }
        }
      }
    );
  });

  const renderTooltip = (messages: any) => (
    <Tooltip id="button-tooltip" className={`${"error-tooltip"}`} {...messages}>
      {messages}
    </Tooltip>
  );

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key && searchResults && searchResults.length) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedOptionIndex((index) =>
          index === -1 ? searchResults?.length - 1 : Math.max(index - 1, 0)
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedOptionIndex((index) =>
          index === searchResults?.length - 1
            ? -1
            : Math.min(index + 1, searchResults.length - 1)
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (
          selectedOptionIndex >= 0 &&
          selectedOptionIndex < searchResults.length
        ) {
          onSearchSelect && onSearchSelect(searchResults[selectedOptionIndex]);
        }
      }
    }
  }
  useEffect(() => {
    if (selectedOptionIndex !== -1 && dropdownRef.current) {
      const dropdownItems =
        dropdownRef.current.querySelectorAll(".dropdown-item");
      const selectedOptionElement = dropdownItems[selectedOptionIndex];
      selectedOptionElement?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedOptionIndex]);
  return (
    <div className="position-relative1">
      <div className="d-flex align-items-center gap-3">
        <div
          className={`listingSearch d-flex align-items-center ${
            isDisabled ? "disabled" : ""
          } ${!dropdownData ? "custom-dropdown-toggle" : ""} ${
            isRequiredField ? "input-required" : ""
          }`}
          id="listingSearch"
        >
          <div className="input-group-text">
            <Image
              width={16}
              height={16}
              src={
                process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/search-grey.svg"
              }
              alt="search-icon"
              className=""
            />
          </div>
          <div className="position-relative3">
            <input
              autoComplete="off"
              aria-autocomplete="list"
              autoCapitalize="none"
              type={
                dropdownData?.filter(
                  (dropVal) => dropVal?.field === selectColumnSearch?.field
                )[0]?.inputType ?? "text"
              }
              className={`search-bar-input ps-0 ${
                !dropdownData || !dropdownData?.length
                  ? "search-bar-rounded"
                  : ""
              } ${isRequiredField ? "input-required" : ""}`}
              id="navbarFormList"
              placeholder={
                customPlaceHolder
                  ? customPlaceHolder
                  : dropdownData &&
                    dropdownData?.filter(
                      (dropVal: {
                        field: string;
                        placeholder?: string;
                        title: string;
                      }) => dropVal?.field === selectColumnSearch?.field
                    )?.length > 0
                  ? dropdownData?.filter(
                      (dropVal) => dropVal?.field === selectColumnSearch?.field
                    )[0]?.placeholder ?? "Search By..."
                  : "Search By..."
              }
              value={
                innerSearchValue && innerSearchValue !== ""
                  ? innerSearchValue
                  : searchValue
              }
              onBlur={(e) => {
                const specificDiv = document.getElementById("box");
                if (
                  isDropdownPresent &&
                  !specificDiv?.contains(e.relatedTarget)
                ) {
                  onBlurSearch && onBlurSearch(e);
                  setSearchValue("");
                }
              }}
              onChange={(e) => {
                onChangeSearch?.(e);
                setSearchValue(e.target.value);
              }}
              ref={inputRef ?? null}
              disabled={isDisabled ?? false}
              onKeyDown={
                isDropdownPresent && innerSearchValue
                  ? (e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)
                  : () => {}
              }
            />

            {isRequiredField ? (
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(
                  selectColumnSearch?.messageForValidation
                    ? selectColumnSearch?.messageForValidation()
                    : ""
                )}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/error.svg"
                  }
                  className="listing-search-error-icon position-absolute"
                  width={18}
                  height={18}
                  alt="error"
                />
              </OverlayTrigger>
            ) : (
              ""
            )}
          </div>
          {dropdownData && dropdownData?.length ? (
            <DropdownButton
              id="dropdown-item-button"
              className="custom-search-dropdown text-center"
              title={selectColumnSearch?.title ?? ""}
              disabled={isDisabled ?? false}
            >
              {dropdownData?.map((d: searchDropdown, i) => {
                if (!d?.isHide) {
                  return (
                    <Dropdown.Item
                      key={"ddsg" + i}
                      as="button"
                      className={`d-flex ${
                        d.field === selectColumnSearch?.field
                          ? "dropDownActive"
                          : ""
                      }`}
                      title={d.title}
                      onClick={() => {
                        if (inputRef && inputRef?.current) {
                          inputRef?.current?.focus();
                        }
                        setSearchValue("");
                        onSelectColumn && onSelectColumn(d);
                      }}
                    >
                      <span className="text-truncate">{d.title}</span>
                    </Dropdown.Item>
                  );
                }
              })}
            </DropdownButton>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isDropdownPresent && searchValue && (
        <div
          className={`listing-search-dropdown position-absolute w-100 top-4 bg-white border`}
          style={{ zIndex: 99 }}
          id="box"
          ref={dropdownRef}
        >
          {searchResults && searchResults?.length > 0 ? (
            searchResults.map((val, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  className={`btn border-bottom p-2 d-flex justify-content-start text-truncate custom-field-dropdown ${
                    selectedOptionIndex === i ? "active" : ""
                  }`}
                  onClick={(e) => {
                    onSearchSelect && onSearchSelect(val, selectColumnSearch);
                    // setSearchValue("")
                  }}
                  onMouseEnter={() => {
                    setSelectedOptionIndex(i);
                  }}
                  active={selectedOptionIndex === i}
                  title={
                    customFieldDropdown
                      ? customFieldDropdown(val)
                      : searchDropdownLabel
                      ? val?.[searchDropdownLabel]
                      : ""
                  }
                >
                  {customFieldDropdown
                    ? customFieldDropdown(val)
                    : searchDropdownLabel
                    ? val?.[searchDropdownLabel]
                    : ""}
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item as="button" className="shadow-sm">
              <div className="d-flex justify-content-center py-2 text-muted">
                No {selectColumnSearch?.title ?? "data"} found.
              </div>
            </Dropdown.Item>
          )}
        </div>
      )}
    </div>
  );
};

export default ListingSearch;
