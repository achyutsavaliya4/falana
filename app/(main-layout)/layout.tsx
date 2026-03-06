import AuthRestrictionWrapper from "@/components/AuthRestrictionWrapper/AuthRestrictionWrapper";
import Navbar from "@/components/Navbar/Navbar";
import NavMenuBar from "@/components/NavMenuBar/NavMenuBar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthRestrictionWrapper>
      <Navbar />
      <NavMenuBar />
      {children}
    </AuthRestrictionWrapper>
  );
};

export default MainLayout;
