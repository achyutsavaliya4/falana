import { PaginationMeta } from "@/commonJS/interfaces/utilsInterface";
import { Facility } from "@/redux/sagas/handlers/authHandler/authHandlerInterface";
import { FacilityEnum, FacilityItem } from "@/redux/sagas/handlers/facilityMasterHandler/facilityMasterHandlerInterface";

export interface FacilityMasterInterface {
  facilityList: FacilityItem[]
  facilityMetadata: PaginationMeta | Record<string, never>;
  facilityDetails: Facility | Record<string, never>;
  facilityEnums: FacilityEnum[]
}