const queries = ["search", "filter", "sort", "page"];
function QueryUtilityFunc(
  searchQuery: string | number | boolean,
  selectedColumn: {
    field: string;
    isMillieSearch?: boolean;
    requestValue?: string;
    customSearch?: boolean;
  },
  filterValues: any,
  sortValue: { val?: string; type?: string },
  page: number,
  filterJSON: any[],
) {
  let apiQuery = "";
  queries.filter((d) => {
    apiQuery =
      apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&"
        ? apiQuery.concat("&")
        : apiQuery.concat("");
    if (d === "search" && searchQuery) {
      if (selectedColumn?.isMillieSearch) {
        if (
          selectedColumn?.requestValue &&
          filterValues?.[selectedColumn?.requestValue] &&
          filterValues?.[selectedColumn?.requestValue] !== ""
        ) {
          apiQuery = apiQuery.concat(
            selectedColumn?.requestValue +
              "=" +
              filterValues?.[selectedColumn?.requestValue],
          );
        }
      } else if (selectedColumn?.customSearch) {
        apiQuery = apiQuery.concat(
          selectedColumn?.field + "=" + encodeURIComponent(searchQuery),
        );
      } else if (selectedColumn?.field) {
        apiQuery = apiQuery.concat(
          "search=" +
            encodeURIComponent(searchQuery) +
            "," +
            selectedColumn?.field,
        );
      } else {
        apiQuery = apiQuery.concat("search=" + encodeURIComponent(searchQuery));
      }
    } else if (d === "filter" && filterValues) {
      filterJSON?.map(
        (
          k: {
            selectValue: boolean;
            field: string;
            fieldName: string;
            isCheckBox: boolean;
          },
          i: number,
        ) => {
          const child: any = k.selectValue ?? false;

          if (k?.isCheckBox) {
            if (filterValues[k.field]) {
              apiQuery =
                apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&"
                  ? apiQuery.concat("&")
                  : apiQuery;
              apiQuery = apiQuery.concat(
                (k?.field === "input" ? k?.fieldName : k?.field) +
                  "=" +
                  (child
                    ? filterValues[k.field]
                        ?.map((item: any) => {
                          return item?.[child];
                        })
                        ?.join(",")
                    : (filterValues[k.field] ?? [])?.join(",")),
              );
            }
          } else {
            if (
              k.field !== "input" && k.field !== "checkbox"
                ? filterValues[k.field]
                : filterValues?.[k?.fieldName] !== null &&
                  filterValues?.[k?.fieldName] !== undefined
            ) {
              apiQuery =
                apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&"
                  ? apiQuery.concat("&")
                  : apiQuery;
              apiQuery = apiQuery.concat(
                (k?.field === "input" || k?.field === "checkbox"
                  ? k?.fieldName
                  : k?.field) +
                  "=" +
                  (child
                    ? filterValues[k.field]?.[child]
                    : k?.field === "input" || k?.field === "checkbox"
                      ? filterValues?.[k?.fieldName]
                      : filterValues[k.field]),
              );
            }
          }
        },
      );
    } else if (d == "sort" && sortValue && Object?.keys(sortValue)?.length) {
      apiQuery = apiQuery.concat(
        "sort_by=" + sortValue.val + "&sort_order=" + sortValue.type,
      );
    } else if (d === "page" && page) {
      apiQuery = apiQuery.concat("page=" + page);
    }
  });

  return apiQuery;
}
export default QueryUtilityFunc;
