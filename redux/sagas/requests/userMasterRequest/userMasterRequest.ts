import { get, post, put, remove } from "@/redux/apiWrapper";
export const getUserMasterListApi = (query?: string) => {
  return get(`/users${query ? `?${query}` : ""}`);
};
export const getUserMasterDetailsApi = (userId: number) => {
  return get(`/users/${userId}`);
};
export const inviteUserApi = (payload: any) => {
  return post(`/users/invite`, payload);
};
export const updateUserDetailsApi = (payload: {userId: number | string, data : any}) => {
  return put(`/users/${payload?.userId}`, payload?.data);
}
export const reInviteUserApi = (userId: number) => {
  return post(`/users/invite/${userId}/reinvite`);
}