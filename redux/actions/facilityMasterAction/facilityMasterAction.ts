import { FacilityAddFormData } from "./facilityMasterInterface";

export const GET_FACILITY_LIST = "GET_FACILITY_LIST";
export const SET_FACILITY_LIST = "SET_FACILITY_LIST";
export const GET_FACILITY_DETAILS = "GET_FACILITY_DETAILS";
export const SET_FACILITY_DETAILS = "SET_FACILITY_DETAILS";
export const CREATE_FACILITY = "CREATE_FACILITY";
export const UPDATE_FACILITY = "UPDATE_FACILITY";
export const DELETE_FACILITY = "DELETE_FACILITY";
export const GET_FACILITY_ENUMS = "GET_FACILITY_ENUMS"
export const SET_FACILITY_ENUMS = "SET_FACILITY_ENUMS";
export const RESET_FACILITY_ENUMS = "RESET_FACILITY_ENUMS"
export const RESET_FACILITY_LIST = "RESET_FACILITY_LIST";

export const getFacilityList = ({ query }: { query: string }) => {
  return {
    type: GET_FACILITY_LIST,
    payload: { query },
  };
};

export const getFacilityDetails = ( facilityId : { facilityId: number | string }) => {
  return {
    type: GET_FACILITY_DETAILS,
    payload: facilityId ,
  };
};

export const createFacility = (data: FacilityAddFormData) => {
  return {
    type: CREATE_FACILITY,
    payload: data,
  };
};

export const updateFacility = (data: any) => {
  return {
    type: UPDATE_FACILITY,
    payload: data,
  };
};


export const deleteFacility = ( facilityId : { facilityId: number | string }) => {
  return {
    type: DELETE_FACILITY,
    payload: facilityId ,
};
};

export const getFacilityEnums = () => {
  return {
    type: GET_FACILITY_ENUMS,
  };
};
export const resetFacilityEnums = () => {
  return {
    type: RESET_FACILITY_ENUMS,
  };
};
export const resetFacilityList = () => {
  return {
    type: RESET_FACILITY_LIST,
  };
};