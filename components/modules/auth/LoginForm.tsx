"use client";
import Input from "@/components/Input/Input";
import { userLogin } from "@/redux/actions/authAction/authAction";
import { emailRegex, mobileRegex, onlyDigitRegex } from "@/utils/regex";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
interface userLoginData {
  email: string;
  password: string;
}
type ValidationResult = { isValid: boolean; message: string };

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<userLoginData>();
  const [isVisible, setVisible] = useState(false);
  const [isCheckValid, setIsCheckValid] = useState(false);
  const handleLogin = async () => {
    setIsCheckValid(true);
    const emailMobileValidation = checkValidation("email");
    const passwordValidation = checkValidation("password");

    if (emailMobileValidation.isValid && passwordValidation.isValid) {
      if (emailRegex.test(formData?.email ?? "")) {
        dispatch(
          userLogin({ email: formData?.email, password: formData?.password } as any),
        );
      } else {
        // for mobile number this api call
        dispatch(
          userLogin({ email: formData?.email, password: formData?.password } as any),
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
    fieldType: "email" | "password",
  ): ValidationResult => {
    const emailOrMobile = formData?.email?.trim() ?? "";
    const password = formData?.password?.trim() ?? "";

    if (!emailOrMobile && !password) {
      return { isValid: false, message: "Email and Password is required." };
    }

    if (fieldType === "password") {
      return password
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Password is Required." };
    }

    if (!emailOrMobile) {
      return { isValid: false, message: "Email or Mobile is required." };
    }

    const isMobile = onlyDigitRegex.test(emailOrMobile);
    if (isMobile) {
      return mobileRegex.test(emailOrMobile)
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Invalid Mobile no." };
    }

    return emailRegex.test(emailOrMobile)
      ? { isValid: true, message: "" }
      : { isValid: false, message: "Invalid Email" };
  };
  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="bg-white form-contaniner">
      <h1 className="header">Login To My Retail Excellence </h1>
      <div className="input-container mb-1">
        <Image
          width={18}
          height={18}
          src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/phone-grey.svg"}
          className="icon"
          alt="Email"
        />
        <Input
          field={{
            id: "email",
            fieldName: "email",
            inputType: "text",
            className: "email",
            placeholder: "Mobile Number",
          }}
          fieldIndex={0}
          fieldData={formData}
          onChangeInput={handleChangeInput}
          onKeyDown={onPressEnter}
        />
      </div>

      {checkValidation("email") && isCheckValid && (
        <span className="error-message">
          {checkValidation("email").message}
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
            id: "password",
            fieldName: "password",
            inputType: isVisible ? "text" : "password",
            className: "password",
            placeholder: "Password",
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
      {checkValidation("password") && isCheckValid && (
        <span className="error-message">
          {checkValidation("password").message}
        </span>
      )}
      <button
        className="w-100 mt-4 button primary-button"
        onClick={handleLogin}
      >
        Login
      </button>
      <div className="mt-3">
        <Link
          href="/forgot-password"
          className="d-flex justify-content-center forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
