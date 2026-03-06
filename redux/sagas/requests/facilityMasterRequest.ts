import { FacilityAddFormData } from "@/redux/actions/facilityMasterAction/facilityMasterInterface";
import { get, post, put, remove } from "@/redux/apiWrapper";
export const getFacilityListApi = (query?: string) => {
  return get(`/facilities${query ? `?${query}` : ""}`);
};
export const getFacilityDetailsApi = (facilityId: number) => {
  return get(`/facilities/${facilityId}`);
};
export const createFacillityApi = (payload: FacilityAddFormData) => {
  return post(`/facilities`, payload);
};
export const updateFacillityApi = (payload: any) => {
  return put(`/facilities/${payload?.facilityId}`, payload?.data);
};
export const deleteFacilityApi = (facilityId: number) => {
  return remove(`/facilities/${facilityId}`);
};
export const getFacilityEnumsApi = () => {
  return get(`/facilities/enums`);
};