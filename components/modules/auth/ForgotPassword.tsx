"use client";
import Input from "@/components/Input/Input";
import { sendResetLink } from "@/redux/actions/authAction/authAction";
import { emailRegex, mobileRegex, onlyDigitRegex } from "@/utils/regex";

import Image from "next/image";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
interface ResetPasswordData {
  mobile_number: string;
}
type ValidationResult = { isValid: boolean; message: string };

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ResetPasswordData>();
  const [isCheckValid, setIsCheckValid] = useState(false);
  const handleLogin = async () => {
    setIsCheckValid(true);
    const emailValidation = checkValidation();

    if (emailValidation.isValid) {
      dispatch(
        sendResetLink({
          mobile_number: formData?.mobile_number,
        } as any),
      );
    }
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...(prev || {}),
      [e.target.name]: e.target.value,
    } as ResetPasswordData));
  };

  const checkValidation = (): ValidationResult => {
    const emailOrMobile = formData?.mobile_number?.trim() ?? "";

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
      <h1 className="header">Forgot Password</h1>
      <div className="input-container mb-1">
        <Image
          width={18}
          height={18}
          src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/phone-grey.svg"}
          className="icon"
          alt="Mobile Number"
        />
        <Input
          field={{
            id: "mobile_number",
            fieldName: "mobile_number",
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

      {checkValidation() && isCheckValid && (
        <span className="error-message">{checkValidation().message}</span>
      )}
      <button
        className="w-100 mt-4 button primary-button"
        onClick={handleLogin}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;
