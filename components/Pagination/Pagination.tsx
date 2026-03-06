import Image from "next/image";

interface Pagination {
  paginationData?: any;
  moveTo?: (pageNo: number) => void;
  isLoadingTableData?: any;
}

const Pagination = ({
  paginationData,
  moveTo,
  isLoadingTableData,
}: Pagination) => {
  const getCurrentPageStartingRecordIndex = () => {
    const startingIndex =
      paginationData?.current_page * paginationData?.per_page -
      paginationData?.per_page +
      1;
    return startingIndex;
  };

  return (
    <div className="d-flex justify-content-between align-items-center py-3">
      <div className="col-3 pagination-info">
        {paginationData?.total > (paginationData?.limit || 10) && (
          <div className="px-4 text-muted">
            Showing {paginationData?.current_page_record ?? ""} of{" "}
            {paginationData?.total}
          </div>
        )}
      </div>
      {paginationData?.total > 10 ? (
        <ul className="d-flex align-items-center justify-content-end gap-3 pe-3 c-pagination">
          <li>
            <button
              className="d-flex align-items-center pagination-button"
              onClick={() => {
                moveTo?.(paginationData?.current_page - 1);
              }}
              disabled={paginationData?.current_page <= 1 || isLoadingTableData}
            >
              <Image
                src={
                  paginationData?.current_page >= paginationData?.last_page
                    ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      // "/icons/right-arrow-grey.svg"
                      "/icons/right-arrow-navy-blue.svg"
                    : process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      "/icons/right-arrow-navy-blue.svg"
                }
                alt="Move to back"
                width={20}
                height={20}
              />
            </button>
          </li>
          <li>
            <div className="pagination-center-data">{`${getCurrentPageStartingRecordIndex()}-${
              getCurrentPageStartingRecordIndex() +
              paginationData?.current_page_record -
              1
            } of ${paginationData?.total}`}</div>
          </li>
          <li>
            <button
              className="d-flex align-items-center pagination-button"
              onClick={() => {
                moveTo?.(paginationData?.current_page + 1);
              }}
              disabled={
                paginationData?.current_page >= paginationData?.last_page ||
                isLoadingTableData
              }
            >
              <Image
                src={
                  paginationData?.current_page <= 1
                    ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      "/icons/left-arrow-navy-blue.svg"
                    : process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      "/icons/left-arrow-navy-blue.svg"
                }
                alt="Move to next"
                width={20}
                height={20}
              />
            </button>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;

// {
/* {paginationData?.current_page <= 1 ||
          paginationData?.last_page <= 6 ? (
            ""
          ) : (
            <li
              className={`page-item cursor-pointer me-2 ${
                paginationData?.current_page <= 1 &&
                "cursor-default disabled me-2"
              }`}
            >
              <a
                className="page-link last-button"
                aria-disabled={paginationData?.current_page <= 1}
                onClick={(e) => {
                  e.preventDefault();
                  moveTo?.(paginationData?.current_page - 1);
                }}
                id="page-previous"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                    "/icons/left-long-arrow-black.svg"
                  }
                  alt="Go to previous page"
                  width={13}
                  height={9}
                />
                <span>Previous</span>
              </a>
            </li>
          )}
          {pagesArray.map((d, index) => {
            if (paginationData?.last_page < 10) {
              return (
                <li
                  key={"middle" + index}
                  className={`page-item me-2 ${
                    paginationData?.current_page == index + 1 ? "active" : ""
                  }`}
                >
                  {paginationData?.total === 0 ? (
                    ""
                  ) : (
                    <button
                      id={"page-" + index + 1}
                      className="page-link"
                      disabled={paginationData?.current_page == index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        moveTo?.(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  )}
                </li>
              );
            } else if (index === 0) {
              return (
                <li
                  key={"middle" + index}
                  className={`page-item me-2 ${
                    paginationData?.current_page == index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    id={"page-" + index + 1}
                    className="page-link"
                    disabled={paginationData?.current_page == index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      moveTo?.(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            } else if (paginationData?.current_page < 5 && index < 5) {
              return (
                <li
                  key={"middle" + index}
                  className={`page-item me-2 ${
                    paginationData?.current_page == index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    id={"page-" + index + 1}
                    className="page-link"
                    disabled={paginationData?.current_page == index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      moveTo?.(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            } else if (paginationData?.current_page > 3 && index < 2) {
              return (
                <button
                  id={"page-" + index + 1}
                  key={"middle" + index}
                  className={`page-link page-item me-2 p-0 pt-2 border-0`}
                  disabled={true}
                >
                  ...
                </button>
              );
            } else if (
              (index < paginationData?.current_page &&
                paginationData?.current_page - 4 < index) ||
              (index < paginationData?.current_page + 2 &&
                paginationData?.current_page - 4 < index)
            ) {
              return (
                <li
                  key={"first" + index}
                  className={`page-item me-2 ${
                    paginationData?.current_page == index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    id={"page-" + index + 1}
                    className="page-link"
                    disabled={paginationData.current_page == index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      moveTo?.(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            } else if (
              index + 1 > paginationData?.last_page - 2 &&
              index + 1 !== paginationData?.last_page
            ) {
              return (
                <button
                  id={"page-" + index + 1}
                  key={"middle" + index}
                  className={`page-link page-item me-2 p-0 pt-2 border-0`}
                  disabled={true}
                >
                  ...
                </button>
              );
            } else if (
              paginationData?.last_page > 8 &&
              paginationData?.last_page === index + 1
            ) {
              return (
                <li
                  key={"last" + index}
                  className={`page-item me-2 ${
                    paginationData?.current_page == index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    id={"page-" + index + 1}
                    className="page-link"
                    disabled={paginationData.current_page == index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      moveTo?.(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            }
          })}
          {paginationData?.current_page >= paginationData?.last_page ||
          paginationData?.last_page <= 6 ? (
            ""
          ) : (
            <li
              className={`page-item cursor-pointer ${
                paginationData?.current_page >= paginationData?.last_page &&
                "cursor-default disabled ms-2"
              }`}
            >
              <a
                className="page-link last-button"
                aria-disabled={
                  paginationData?.current_page >= paginationData?.last_page
                }
                onClick={(e) => {
                  e.preventDefault();
                  moveTo?.(paginationData?.current_page + 1);
                }}
                id="page-next"
              >
                <span>Next</span>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                    "/icons/right-long-arrow-black.svg"
                  }
                  alt="Go to next page"
                  width={13}
                  height={9}
                />
              </a>
            </li>
          )} */
// }
