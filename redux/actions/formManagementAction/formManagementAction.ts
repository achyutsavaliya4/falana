import { CreateForm } from "./formManagementActionInterface";

export const GET_FORM_LIST = "GET_FORM_LIST";
export const SET_FORM_LIST = "SET_FORM_LIST";
export const SET_FORM_LIST_META = "SET_FORM_LIST_META";
export const SET_FORM_LIST_LINKS = "SET_FORM_LIST_LINKS";
export const CREATE_FORM = "CREATE_FORM";
export const EDIT_FORM = "EDIT_FORM";

export const getFormList = ({
  workspaceId,
  query,
}: {
  workspaceId: number;
  query?: string;
}) => {
  return {
    type: GET_FORM_LIST,
    payload: { workspaceId, query },
  };
};

export const createForm = (data: CreateForm) => {
  return {
    type: CREATE_FORM,
    payload: data,
  };
};

export const EditForm = (id: number, data: CreateForm) => {
  return {
    type: EDIT_FORM,
    payload: { id, data },
  };
};
