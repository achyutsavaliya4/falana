import Image from "next/image";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="loginPage">
      <div className="loginPage__left">
        <div className="loginPage__brand">
          <Image
            width={444}
            height={118}
            src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/medkart-logo.webp"}
            alt="Medkart Logo"
            priority
            unoptimized
          /> 
        </div>
      </div>

      <div className="loginPage__right">{children}</div>
    </div>
  );
};

export default LoginLayout;
