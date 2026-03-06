import Image from "next/image";
import React from "react";
import CommonForm from "../CommonForm/CommonForm";
import {
  questionSettings,
  requiredSwitchJSON,
} from "@/commonJson/form-management/questionSettings";
import { onClickFieldResolver } from "../Button/Button";
import PriorityDropdown, { Option } from "../PriorityDropdown/PriorityDropdown";

type QuestionCardWrapperProps = {
  type: "text" | "number" | string;
  title?: string;
  isRequired?: boolean;
  onTitleChange?: (value: string) => void;
  children?: React.ReactNode;
  onClickFieldQuestionSettings: onClickFieldResolver;
  field: any;

  // priority dropdown functions
  dropdownValue?: any;
  dropdownOptions: Option[];
  optionKey?: string;
  optionValue?: string;
  onSelectDropdown?: (value: Option) => void;
  onChangeSwitch?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => void;
};

export default function QuestionCardWrapper({
  type,
  title = "Add Question Title",
  isRequired = true,
  onTitleChange,
  children,
  onClickFieldQuestionSettings,
  field,
  dropdownOptions,
  dropdownValue,
  optionKey,
  optionValue,
  onSelectDropdown,
  onChangeSwitch,
}: QuestionCardWrapperProps) {
  return (
    <div className="d-flex align-items-center gap-3 question-section">
      <Image
        width={20}
        height={20}
        src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS}/icons/drag-blue.svg`}
        alt="arrow-icon"
        unoptimized
      />

      <div className="flex-fill">
        <div className="d-flex gap-2 w-100 flex-column">
          <div className="d-flex align-items-center gap-1 border-bottom p-1">
            <input
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              className="border-0 primary-input p-0"
              style={{
                fontSize: "16px",
                lineHeight: "18px",
                fontWeight: 500,
                width: "auto",
              }}
            />
            {isRequired ? (
              <span style={{ color: "red", fontWeight: 700 }}>*</span>
            ) : null}
          </div>
          {children ? (
            <div className="d-flex align-items-center gap-3">{children}</div>
          ) : null}
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-3">
            <CommonForm
              formJson={requiredSwitchJSON}
              fieldData={field}
              onChangeSwitch={onChangeSwitch}
            />
            <PriorityDropdown
              options={dropdownOptions}
              value={dropdownValue}
              optionKey={optionKey}
              optionValue={optionValue}
              onChange={onSelectDropdown ?? (() => {})}
            />
          </div>
          <CommonForm
            formJson={questionSettings}
            fieldData={field}
            onClickField={onClickFieldQuestionSettings}
          />
        </div>
      </div>
    </div>
  );
}
