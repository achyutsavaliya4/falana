"use client";
import { RootState } from "@/redux";
import { getToaster } from "@/redux/actions/toasterAction/toasterAction";
import { toasterState } from "@/redux/reducers/toasterReducer/toasterReducerInterface";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Toaster = () => {
  const dispatch = useDispatch();
  const { toasterData, errMsg } = useSelector(
    (state: RootState) => state.toaster as toasterState
  );

  useEffect(() => {
    if (toasterData?.type) {
      setTimeout(() => {
        dispatch(getToaster({ type: "", message: "" }));
      }, 5000);
    }
  }, [dispatch, toasterData]);

  return (
    <>
      {toasterData && toasterData?.type && (
        <div
          id="hide-toaster"
          className={`alert alert-success alert-dismissible fade show toaster-show ${toasterData?.type}`}
          role="alert"
        >
          {toasterData ? (
            typeof toasterData.message?.errors === "object" ? (
              <ul className="mb-0">
                {Object.keys(toasterData.message?.errors).map((key, ind) => {
                  return (
                    <li key={ind}>
                      <Image
                        width={18}
                        height={18}
                        src={`${
                          toasterData?.type === "success"
                            ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                              "/assets/icons/check_verified_blue.webp"
                            : toasterData?.type === "error"
                            ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                              "/assets/icons/warning-icon-red.svg"
                            : ""
                        }`}
                        className="search_icon my-auto me-2"
                        alt="success"
                        unoptimized={true}
                      />
                      <span>
                        {toasterData.message.errors[key]?.length
                          ? toasterData.message.errors[key]
                          : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>
                <Image
                  width={18}
                  height={18}
                  src={`${
                    toasterData?.type === "success"
                      ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/check_verified_blue.webp"
                      : toasterData?.type === "error"
                      ? process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                        "/assets/icons/warning-icon-red.svg"
                      : ""
                  }`}
                  className="search_icon my-auto me-2"
                  alt="success"
                  unoptimized={true}
                />
                <span>
                  {typeof toasterData.message === "string"
                    ? toasterData.message
                    : toasterData.message?.message}
                </span>
              </>
            )
          ) : null}
          <button
            // type="button"
            data-bs-dismiss="alert"
            aria-label="btn-close"
            onClick={() => {
              dispatch(getToaster({ type: "", message: "" }));
            }}
            >
            <Image
              src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/cross-black.svg"}
              alt="eye"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </>
  );
};
export default Toaster;
