import React, { useEffect, useState } from "react";
import ListingSearch from "../ListingSearch/ListingSearch";
import FilterSection from "../FilterSection/FilterSection";
import ListingFilter from "../ListingFilter/ListingFilter";
import Image from "next/image";
import Pagination from "../Pagination/Pagination";
import GridTable from "../Tables/GridTable";

type arrayData = any[] | [];

type searchDropdown = {
  title: string;
  field: string;
  isHide?: boolean;
  placeholder?: string;
};

type bulkButtons = { title: string; value: string }[];

interface ListingComponents {
  filterInitialValue?: boolean;
  showFilters?: boolean;
  showSearchBar?: boolean;

  // listing search types
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
  isMultipleData?: boolean;
  // listing filter types
  sortingColumnData?: any[];
  onSelectSortColumn?: Function;
  selectedSortColumn?: any;
  onSelectSortType?: Function;
  selectedSortType?: string;
  isDisabledFilter?: boolean;
  isDisabledSortBy?: boolean;

  // dynamic table types
  columns?: arrayData;
  data?: any;
  showActions?: boolean;
  onClickButton?: Function;
  selectAll?: Function;
  uncheckAll?: Function;
  buttons?: bulkButtons;
  rowBodyClassName?: any;
  rowHeaderClassName?: string;
  noDataMessage?: string;
  noDataHeadingMessage?: string;
  configData?: any;
  onClickActionField?: (
    fieldId: string,
    rowValue: any,
    rowIdx?: number,
    parentRowIdx?: number
  ) => void;
  onChangeActionField?: Function;
  onBlurActionField?: Function;
  subTableColumnClassName?: string;
  expandControlClick?: (
    rowValue: any,
    showMore: boolean,
    expandKey?: string,
    actionField?: any,
    rowIdx?: number
  ) => void;

  // filter section types

  filterColumn?: any[];
  clearAllFilter?: Function;
  clearFilter?: Function;
  onDropdownSearch?: Function;
  selectedFilterValue?: any;
  onSelectValue?: Function;
  onSelectRange?: Function;
  valueData?: any;
  onClickFilterTitle?: Function;
  permissons?: any;
  filterInputQuery?: any;

  // pagination types
  hidePagination?: boolean;
  paginationData?: any;
  moveTo?: (pageNo: number) => void;

  //styling
  searchFilterButtonStyle?: string;
  // custom button types
  customButtons?: Function;
  showStatusCount?: boolean;
  onClickHandler?: Function | undefined;
  statusCountJson?: any;
  statusCountData?: any;
  onBlurSearch?: Function;
  isLoadingTableData?: any;
  isLoadMoreButton?: boolean;
  loadMoreButtonOnClick?: any;
  onFilterApplyButton?: Function;
  isEnabledApplyFilterButton?: boolean;
}

const ListingComponents: React.FC<ListingComponents> = ({
  filterInitialValue = false,
  showFilters,
  showSearchBar,
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
  columns,
  data,
  showActions,
  onClickButton,
  selectAll,
  uncheckAll,
  buttons,
  rowBodyClassName,
  rowHeaderClassName,
  noDataMessage,
  noDataHeadingMessage,
  configData,
  onClickActionField,
  onChangeActionField,
  onBlurActionField,
  isRequiredField,
  sortingColumnData,
  onSelectSortColumn,
  selectedSortColumn,
  onSelectSortType,
  selectedSortType,
  isDisabledFilter,
  isDisabledSortBy,
  filterColumn,
  clearAllFilter,
  clearFilter,
  onDropdownSearch,
  selectedFilterValue,
  onSelectValue,
  onSelectRange,
  valueData,
  onClickFilterTitle,
  permissons,
  subTableColumnClassName,
  filterInputQuery,
  hidePagination,
  paginationData,
  moveTo,
  customButtons,
  searchFilterButtonStyle,
  isMultipleData,
  showStatusCount,
  onClickHandler,
  statusCountJson,
  statusCountData,
  onBlurSearch,
  isLoadMoreButton,
  loadMoreButtonOnClick,
  isEnabledApplyFilterButton,
  onFilterApplyButton,
  expandControlClick
}: ListingComponents) => {
  const [showFilter, setShowFilter] = useState<boolean>(filterInitialValue);

  useEffect(() => {
    setShowFilter(filterInitialValue);
  }, [filterInitialValue]);
  // const { isLoadingTableData } = useSelector((state) => state.loader);
  // TODO:- make use of redux for this flag
  const isLoadingTableData = false;
  return (
    <>
      <div className="position-relative listing-component">
        <div
          className={`d-flex align-items-center justify-content-between m-0 px-3 py-2 gap-4 ${searchFilterButtonStyle ?? ""} `}
        >
          {!showSearchBar && (
            <ListingSearch
              dropdownData={dropdownData}
              isDropdownPresent={isDropdownPresent}
              selectColumnSearch={selectColumnSearch}
              onSelectColumn={onSelectColumn}
              onChangeSearch={onChangeSearch}
              searchResults={searchResults}
              onSearchSelect={onSearchSelect}
              searchDropdownLabel={searchDropdownLabel}
              innerSearchValue={innerSearchValue}
              isDisabled={isDisabled}
              customPlaceHolder={customPlaceHolder}
              customFieldDropdown={customFieldDropdown}
              isRequiredField={isRequiredField}
              onBlurSearch={onBlurSearch}
            />
          )}

          {(!isDisabledFilter || !isDisabledSortBy) && (
            <ListingFilter
              setShowFilter={() => {
                setShowFilter((prev) => !prev);
              }}
              sortingColumnData={sortingColumnData}
              onSelectSortColumn={onSelectSortColumn}
              selectedSortColumn={selectedSortColumn}
              onSelectSortType={onSelectSortType}
              selectedSortType={selectedSortType}
              isDisabledFilter={isDisabledFilter}
              isDisabledSortBy={isDisabledSortBy}
              isEnabledApplyFilterButton={isEnabledApplyFilterButton}
              onFilterApplyButton={onFilterApplyButton}
            />
          )}
          {customButtons && customButtons()}
        </div>
        <div className="d-flex justify-content-between">
          {showFilter || showFilters ? (
            <FilterSection
              filterColumn={filterColumn}
              clearAllFilter={clearAllFilter}
              clearFilter={clearFilter}
              onChangeSearch={onDropdownSearch}
              selectedFilterValue={selectedFilterValue}
              onSelectValue={onSelectValue}
              onSelectRange={onSelectRange}
              valueData={valueData}
              onClickFilterTitle={onClickFilterTitle}
              filterInputQuery={filterInputQuery}
            />
          ) : null}
        </div>

        {isMultipleData ? (
          Object.keys(data || {})?.length > 0 &&
          Object.keys(data || {})?.map((singleData: string, index: any) => {
            return (
              <div key={"dataMul" + index} className="d-flex flex-column ">
                <div
                  className="d-flex justify-content-center fs-5"
                  style={{
                    background: "#F2F2F9",
                    color: "#5556A6",
                    padding: "5.5px 0px",
                  }}
                >
                  {singleData ?? ""}
                </div>
                {data?.[singleData]?.length > 0 ? (
                  <GridTable
                    columns={[...(columns ?? [])]}
                    data={data?.[singleData] ?? []}
                    onClickActionField={onClickActionField}
                  />
                ) : (
                  <div className=" py-5 text-center ">
                    <div className="d-flex w-100 justify-content-center">
                      {/* nodata-table.svg */}
                      <Image
                        src="/assets/icons/no-data-table_new.webp"
                        width={48}
                        height={48}
                        alt="Close Icon"
                        className="m-0 p-0 no-data-img"
                        unoptimized={true}
                      />
                    </div>
                    <div className="no-data-heading-message fw-bolder">
                      {noDataHeadingMessage ?? "No Data"}
                    </div>
                    <div className="no-data-message">
                      {noDataMessage ?? "You do not have any reports."}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <GridTable
            columns={[...(columns ?? [])]}
            data={data ?? []}
            onClickActionField={onClickActionField}
            expandControlClick={expandControlClick}
          />
        )}

        {!hidePagination && Object.keys(paginationData || {})?.length > 0 && (
          <Pagination
            paginationData={paginationData}
            moveTo={moveTo}
            isLoadingTableData={isLoadingTableData}
          />
        )}
      </div>
    </>
  );
};

export default ListingComponents;
