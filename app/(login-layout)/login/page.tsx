"use client";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import LoginForm from "@/components/modules/auth/LoginForm";
import { RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const router = useRouter();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  // console.log("userDetails", userDetails);
  useEffect(() => {
    if (hasKeys(userDetails)) {
      const tenant = userDetails.tenants[0];
      const roleKeys = Object.keys(tenant?.roles || {});
      const isSingleRole = roleKeys?.length === 1;
      if (hasKeys(tenant?.roles) && isSingleRole) {
        const role = tenant?.roles[roleKeys[0]];
        if (role?.is_facility_login_required) {
          router.push("/facility");
        } else {
          router.push("/");
        }
      } else {
        router.push("/facility");
      }
    }
  }, [userDetails]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
