"use client";

import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";
import SearchableSelect from "@/components/SearchableSelect/SearchableSelect";
import { RootState } from "@/redux";
import { Facility } from "@/redux/sagas/handlers/authHandler/authHandlerInterface";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const FacilitySelection = () => {
  const router = useRouter();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [facilities, setFacilities] = useState<Facility[]>();
  const [formData, setFormData] = useState<{ facility: Facility }>();
  const handleClickProceed = async () => {
    localStorage.setItem("facility_id", String(formData?.facility?.facility_id || ""));
    router?.push("/");
  };
  const facilityFieldJson = {
    fieldName: "facility",
    as: "select" as const,
    optionKey: "facility_slug",
    id: "facility",
    placeholder: "Select Facility",
    searchbleClass: "mt-2",
  };
  const handleSelectFacility = (item: any, field: any) => {
    setFormData((prev) => ({ ...(prev || {}), [field?.fieldName]: item } as { facility: Facility }));
  };

  useEffect(() => {
    if (hasKeys(userDetails)) {
      const tenant = userDetails.tenants[0];
      if (checkArray(tenant?.facilities)) {
        setFacilities(tenant?.facilities);
      }
    }
  }, [userDetails]);

  return (
    <div className="bg-white form-contaniner">
      <h1 className="header">Login To My Retail Excellence </h1>
      <div className="user-details">
        <h2 className="text-center name">{userDetails?.profile?.name}</h2>
      </div>
      <div className="mt-4 mb-1">
        <label htmlFor="facility" className="facility-label">
          Select Facility
        </label>
        <SearchableSelect
          field={facilityFieldJson}
          fieldData={formData}
          configData={{ facility: facilities }}
          onSearchSelect={handleSelectFacility}
          fieldIndex={0}
          isLoading={false}
        />
      </div>

      <button
        className="w-100 mt-4 button primary-button"
        onClick={handleClickProceed}
      >
        Proceed
      </button>
    </div>
  );
};

export default FacilitySelection;
