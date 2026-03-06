import { CreateForm } from "@/redux/actions/formManagementAction/formManagementActionInterface";
import { get, post, put } from "@/redux/apiWrapper";

export const getFormListApi = (workspaceId: number, query?: string) => {
  return get(
    `/open/workspaces/${workspaceId}/forms${query ? `?${query}` : ""}`,
  );
};

export const getCreateFormApi = (data: CreateForm) => {
  return post("/open/forms", data);
};

export const getEditFormApi = (id: number, data: CreateForm) => {
  return put(`open/forms/${id}`, data);
};
