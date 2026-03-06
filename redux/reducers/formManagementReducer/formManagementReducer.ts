import {
  SET_FORM_LIST,
  SET_FORM_LIST_LINKS,
  SET_FORM_LIST_META,
} from "@/redux/actions/formManagementAction/formManagementAction";
import { FormManagementState } from "./formManagementReducerInterface";

const initialState: FormManagementState = {
  formsList: [],
  formsMeta: {},
  formsLinks: {},
};

const formManagementReducer = (
  state: FormManagementState = initialState,
  action: { type: string; payload: any }
): FormManagementState => {
  switch (action.type) {
    case SET_FORM_LIST:
      return {
        ...state,
        formsList: action.payload,
      };
    case SET_FORM_LIST_META:
      return {
        ...state,
        formsMeta: action.payload,
      };
    case SET_FORM_LIST_LINKS:
      return {
        ...state,
        formsLinks: action.payload,
      };

    default:
      return state;
  }
};

export default formManagementReducer;
