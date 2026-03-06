"use client";

import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { RootState } from "@/redux";
import { userDetails } from "@/redux/actions/authAction/authAction";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthRestrictionWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userDetails: fetchedUserDetails } = useSelector(
    (state: RootState) => state.auth,
  );
  useEffect(() => {
    const rawAccessToken = localStorage.getItem("access_token");
    const accessToken = rawAccessToken?.trim();
    if (!accessToken) {
      router?.push("/login");
      storage.clearLoginTokens();
    } else if (!hasKeys(fetchedUserDetails)) {
      dispatch(userDetails());
    }
  }, []);
  return <>{children}</>;
};

export default AuthRestrictionWrapper;
