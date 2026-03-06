export const SET_UI_ACTION = "SET_UI_ACTION";
export const RESET_UI_ACTION = "RESET_UI_ACTION";
export const resetUiAction = () => {
  return {
    type: RESET_UI_ACTION,
  };
};
export const setUiAction = (payload: any) => {
  return {
    type: SET_UI_ACTION,
    payload
  };
};