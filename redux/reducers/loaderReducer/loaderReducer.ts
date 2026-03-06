import {
  SET_BTN_LOADER_ACTION,
  SET_COMMON_LOADER,
  SET_COMMON_PAGE_LOADER,
  SET_MUI_LOADER_ACTION,
  SET_TABLE_LOADER_ACTION,
} from "@/redux/actions/loaderAction/loaderAction";
import { loaderInterface } from "./loaderReducerInterface";

const initialState: loaderInterface = {
  btnLoaderData: {},
  muiLoaderData: {},
  isLoadingTableData: false,
  isLoading: false,
  isPageLoading: false,
};

export const loaderReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SET_BTN_LOADER_ACTION:
      return {
        ...state,
        btnLoaderData: action?.payload,
      };
    case SET_MUI_LOADER_ACTION:
      return {
        ...state,
        muiLoaderData: action?.payload,
      };
    case SET_TABLE_LOADER_ACTION:
      return {
        ...state,
        isLoadingTableData: action?.payload?.isLoadingTableData ?? false,
      };
    case SET_COMMON_LOADER:
      return {
        ...state,
        isLoading: action?.payload?.isLoading,
      };
    case SET_COMMON_PAGE_LOADER:
      return {
        ...state,
        isPageLoading: action?.payload,
      };
    default:
      return state;
  }
};
