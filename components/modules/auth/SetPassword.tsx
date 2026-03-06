"use client";
import Input from "@/components/Input/Input";
import {
  resetPassword,
  setNewPassword,
} from "@/redux/actions/authAction/authAction";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
interface userLoginData {
  password: string;
  cpassword: string;
}
type ValidationResult = { isValid: boolean; message: string };

const SetPassword = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite_token");
  const [formData, setFormData] = useState<userLoginData>();
  const [isVisible, setVisible] = useState(false);
  const [isCheckValid, setIsCheckValid] = useState(false);
  const handleLogin = async () => {
    setIsCheckValid(true);
    const cpasswordValidation = checkValidation("password");
    const passwordValidation = checkValidation("cpassword");

    if (cpasswordValidation.isValid && passwordValidation.isValid) {
      if (pathname === "/set-password") {
        dispatch(
          setNewPassword({
            password: formData?.password,
            confirm_password: formData?.cpassword,
            invite_token: inviteToken,
          } as any),
        );
      } else if (pathname === "/reset-password") {
        dispatch(
          resetPassword({
            password: formData?.password,
            confirm_password: formData?.cpassword,
          } as any),
        );
      }
    }
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...(prev || {}),
      [e.target.name]: e.target.value,
    } as userLoginData));
  };

  const checkValidation = (
    fieldType: "password" | "cpassword",
  ): ValidationResult => {
    const password = formData?.password?.trim() ?? "";
    const cpassword = formData?.cpassword?.trim() ?? "";

    if (!cpassword && !password) {
      return {
        isValid: false,
        message: "Password and Confirm Password is required.",
      };
    }

    if (fieldType === "password") {
      return password
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Password is Required." };
    }
    if (fieldType === "cpassword") {
      return cpassword !== password
        ? { isValid: false, message: "Password not matched." }
        : !cpassword
          ? { isValid: false, message: "Password is Required." }
          : { isValid: true, message: "" };
    }
    return { isValid: true, message: "" };
  };
  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="bg-white form-contaniner">
      <h1 className="header">Set Password</h1>
      <div className="input-container mb-1">
        <Image
          width={18}
          height={18}
          src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/lock-grey.svg"}
          className="icon"
          alt="Password"
        />
        <Input
          field={{
            id: "password",
            fieldName: "password",
            inputType: "text",
            className: "password",
            placeholder: "New Password",
          }}
          fieldIndex={0}
          fieldData={formData}
          onChangeInput={handleChangeInput}
          onKeyDown={onPressEnter}
        />
      </div>

      {checkValidation("password") && isCheckValid && (
        <span className="error-message">
          {checkValidation("password").message}
        </span>
      )}
      <div className="input-container">
        <Image
          width={18}
          height={18}
          src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/lock-grey.svg"}
          className="icon"
          alt="Password"
        />
        <Input
          field={{
            id: "cpassword",
            fieldName: "cpassword",
            inputType: isVisible ? "text" : "password",
            className: "password",
            placeholder: "Confirm Password",
          }}
          fieldIndex={1}
          fieldData={formData}
          onChangeInput={handleChangeInput}
          onKeyDown={onPressEnter}
        />
        <button
          className="d-flex align-items-center password-visibility"
          onClick={() => {
            setVisible(!isVisible);
          }}
        >
          {isVisible ? (
            <Image
              width={18}
              height={18}
              src={
                process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                "/icons/close-eye-black.svg"
              }
              alt="Hide Password"
            />
          ) : (
            <Image
              width={18}
              height={18}
              src={
                process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                "/icons/open-eye-navy-blue.svg"
              }
              alt="View Password"
            />
          )}
        </button>
      </div>
      {checkValidation("cpassword") && isCheckValid && (
        <span className="error-message">
          {checkValidation("cpassword").message}
        </span>
      )}
      <button
        className="w-100 mt-4 button primary-button"
        onClick={handleLogin}
      >
        {pathname === "/reset-password" ? "Change Password" : "Set Password"}
      </button>
    </div>
  );
};

export default SetPassword;
