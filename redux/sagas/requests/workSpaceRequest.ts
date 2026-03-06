import { get } from "@/redux/apiWrapper";

export const getWorkspaceListApi = () => {
  return get("/open/workspaces");
};
