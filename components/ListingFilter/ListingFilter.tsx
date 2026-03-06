import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface ListingFilter {
  setShowFilter?: MouseEventHandler<HTMLButtonElement> | undefined;
  sortingColumnData?: any[];
  onSelectSortColumn?: Function;
  selectedSortColumn?: any;
  onSelectSortType?: Function;
  selectedSortType?: string;
  isDisabledFilter?: boolean;
  isDisabledSortBy?: boolean;
  isEnabledApplyFilterButton?: boolean;
  onFilterApplyButton?: Function;
}
const ListingFilter: React.FC<ListingFilter> = ({
  setShowFilter,
  sortingColumnData,
  onSelectSortColumn,
  selectedSortColumn,
  onSelectSortType,
  selectedSortType,
  isDisabledFilter,
  isDisabledSortBy,
  isEnabledApplyFilterButton,
  onFilterApplyButton,
}) => {
  return (
    <div className="d-flex justify-content-end filterSorting position-relative1">
      {!isDisabledFilter && (
        <div className="filter-section">
          <button
            id="dropdown-basic"
            className={`btn px-4 ${
              !isDisabledFilter && isDisabledSortBy
                ? "border-end rounded-1"
                : ""
            }`}
            onClick={setShowFilter}
          >
            <Image
              width={16}
              height={16}
              src={
                process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                "/icons/sort-black.svg"
              }
              alt="filterIcon-icon"
              style={{ marginRight: "0.35rem" }}
            />
            Filter
          </button>
        </div>
      )}
      {isEnabledApplyFilterButton && (
        <div className="filter-section ms-4">
          <button
            id="dropdown-basic"
            className={`btn px-4 ${
              !isDisabledFilter && isDisabledSortBy
                ? "border-end rounded-1"
                : ""
            }`}
            onClick={(e) => {
              onFilterApplyButton?.(e);
            }}
          >
            Apply filter
          </button>
        </div>
      )}
      {!isDisabledSortBy && (
        <Dropdown className="sorting-section">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={`${
              isDisabledFilter ? "borderRightSingle" : "borderRight"
            } px-3`}
          >
            <Image
              width={18}
              height={16}
              src={
                process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/filter-black.svg"
              }
              alt="Sort by"
              style={{ marginRight: "0.35rem" }}
            />
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu className="sortMenu pt-1 pe-0">
            {sortingColumnData
              ? sortingColumnData.map((d, i) => {
                  return (
                    <div key={"formchecked" + i}>
                      <Form.Check
                        type="radio"
                        id={d.field}
                        label={d.title}
                        className="radioButton form-check-sort d-flex align-items-center"
                        checked={d.field === selectedSortColumn}
                        onChange={() => {
                          onSelectSortColumn?.(d);
                        }}
                      />
                    </div>
                  );
                })
              : ""}
            <div className="sortMenufooter">
              <div
                className={`d-flex cursor-pointer align-items-center`}
                style={{
                  color: selectedSortType === "asc" ? "#202149" : "#000",
                }}
                onClick={() => onSelectSortType?.("asc")}
              >
                <Image
                  width={13}
                  height={13}
                  src={
                    selectedSortType === "asc"
                      ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/ArrowUp-blue.svg"
                      : process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/ArrowUp.svg"
                  }
                  alt="arrowUp-icon"
                  className="me-1"
                />
                <label>Ascending</label>
              </div>
              <div
                className={`d-flex cursor-pointer align-items-center col-12 py-1`}
                style={{
                  color: selectedSortType === "dsc" ? "#202149" : "#000",
                }}
                onClick={() => onSelectSortType?.("dsc")}
              >
                <Image
                  width={13}
                  height={13}
                  src={
                    selectedSortType === "d"
                      ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/ArrowDown-blue.svg"
                      : process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/ArrowDown.svg"
                  }
                  alt="arrowDown-icon"
                  className="me-1"
                />
                <label>Descending</label>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default ListingFilter;
