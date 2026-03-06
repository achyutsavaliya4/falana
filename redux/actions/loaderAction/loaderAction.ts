export const SET_BTN_LOADER_ACTION = "SET_BTN_LOADER_ACTION";
export const SET_TABLE_LOADER_ACTION = "SET_TABLE_LOADER_ACTION";
export const SET_MUI_LOADER_ACTION = "SET_MUI_LOADER_ACTION";
export const SET_COMMON_LOADER = "SET_COMMON_LOADER";
export const SET_COMMON_PAGE_LOADER = "SET_COMMON_PAGE_LOADER";
export const setBtnLoaderAction = (
  payload: any
): { type: typeof SET_BTN_LOADER_ACTION; payload?: any } => {
  return {
    type: SET_BTN_LOADER_ACTION,
    payload,
  };
};
export const clearBtnLoaderAction = (): {
  type: typeof SET_BTN_LOADER_ACTION;
  payload?: any;
} => {
  return { type: SET_BTN_LOADER_ACTION, payload: {} };
};

export const setMuiLoaderAction = (
  payload: any
): { type: typeof SET_MUI_LOADER_ACTION; payload?: any } => {
  return {
    type: SET_MUI_LOADER_ACTION,
    payload,
  };
};

export const setTableLoadingAction = (
  payload: any
): { type: typeof SET_TABLE_LOADER_ACTION; payload?: any } => {
  return {
    type: SET_TABLE_LOADER_ACTION,
    payload,
  };
};
export const setCommonLoader = (
  payload: any
): { type: typeof SET_COMMON_LOADER; payload?: any } => {
  return {
    type: SET_COMMON_LOADER,
    payload,
  };
};
export const setPageLoader = (payload: boolean) => {
  return {
    type: SET_COMMON_PAGE_LOADER,
    payload: payload,
  };
};
