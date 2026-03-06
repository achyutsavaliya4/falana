import {
  SET_FACILITY_DETAILS,
  SET_FACILITY_LIST,
  SET_FACILITY_ENUMS,
  RESET_FACILITY_ENUMS,
  RESET_FACILITY_LIST,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { FacilityMasterInterface } from "./facilityMasterReducerInterface";

const initialState: FacilityMasterInterface = {
  facilityList: [],
  facilityMetadata: {},
  facilityDetails: {},
  facilityEnums: [],
};

const facilityMasterReducer = (
  state: FacilityMasterInterface = initialState,
  action: { type: string; payload: any },
): FacilityMasterInterface => {
  switch (action.type) {
    case SET_FACILITY_LIST:
      return {
        ...state,
        facilityList: action?.payload?.data?.facilities,
        facilityMetadata: action?.payload?.meta,
      };
    case SET_FACILITY_DETAILS:
      return {
        ...state,
        facilityDetails: action?.payload,
      };
    case SET_FACILITY_ENUMS:
      return {
        ...state,
        facilityEnums: action?.payload,
      };
    case RESET_FACILITY_ENUMS:
      return {
        ...state,
        facilityEnums: [],
      };
    case RESET_FACILITY_LIST:
      return {
        ...state,
        facilityList: [],
        facilityMetadata: {},
      };
    default:
      return state;
  }
};

export default facilityMasterReducer;
