import AuthRestrictionWrapper from "@/components/AuthRestrictionWrapper/AuthRestrictionWrapper";
import FacilitySelection from "@/components/modules/auth/FacilitySelection";

const FacilitySelectionPage = () => {
  return (
    <AuthRestrictionWrapper>
      <FacilitySelection />
    </AuthRestrictionWrapper>
  );
};

export default FacilitySelectionPage;
