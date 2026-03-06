"use client";
import React, {
  CSSProperties,
  MouseEvent,
  useState,
  useMemo,
  useEffect,
} from "react";
import CommonForm from "@/components/CommonForm/CommonForm";
import { addTaskJson } from "@/commonJson/task/addTaskJson";
import axios from "axios";
import {
  getFormList,
  getTaskList,
} from "@/redux/actions/taskMasterAction/taskMasterAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { DefaultFunction } from "@/commonJS/interfaces/utilsInterface";

export interface button {
  id: string;
  fieldName: string;
  className?: ButtonResolver<string> | string;
  label?: ButtonResolver<string | undefined> | string;
  disabled?: ButtonResolver<boolean> | boolean;
  url?: ButtonResolver<string> | string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  style?: CSSProperties;
  imagePosition?: "front" | "back";
  variant?: "primary" | "secondary" | "default" | "base";
}

type ButtonResolver<Return> = DefaultFunction<button, Return>;
export type onClickFieldResolver = (
  event: MouseEvent<HTMLButtonElement>,
  field: button,
  fieldData: any,
  fullFieldData: any,
  configData: any,
  fieldIndex: number,
  repeatChildIndex?: number,
) => void;
const TaskAdd = () => {
  const dispatch = useDispatch();

  const { formList, taskList } = useSelector(
    (state: RootState) => state.taskMaster,
  );
  // const [formList, setFormList] = useState<any[]>([]);
  // const [taskList, setTaskList] = useState<any[]>([]);
  const [formData, setFormData] = useState({});
  const [isCheckValid, setIsCheckValid] = useState(false);

  useEffect(() => {
    dispatch(getFormList());
    dispatch(getTaskList());
  }, []);
  console.log("forms", formList);
  console.log("tasks", taskList);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    let { name, value } = e.target;
    if (field?.inputType === "radio" && field?.optionValue) {
      value = field?.optionValue;
    }
    // console.log(field);
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  };

  const onChangeSelect = (e: any, field: any) => {
    setFormData((prev) => ({ ...prev, [field?.fieldName]: e.target.value }));
  };
  // console.log(formData);
  const onSearchSelect = (item: any, field: any, repeatChildIndex: number) => {
    // console.log("item", item, field);
    setFormData((prev) => ({ ...prev, [field?.fieldName]: item }));
  };
  // console.log(formData);
  const onClickField = (
    e: React.MouseEvent<HTMLButtonElement>,
    field: button,
  ) => {
    setIsCheckValid(true);
    const isFormValid = validateFormStructure(addTaskJson, formData);
    if (isFormValid) {
      console.log("SUCCESS: Form is valid", formData);
    } else {
      console.log("ERROR: Fix validation errors before saving");
    }
    console.log(formData);
  };
  const validateFormStructure = (json: any[], data: any): boolean => {
    let isValid = true;

    const checkSection = (section: any) => {
      if (section.hiddenFor && !section.hiddenFor(section, data, data)) {
        return;
      }

      if (section.child) {
        if (Array.isArray(section.child)) {
          section.child.forEach((child: any) => checkSection(child));
        } else {
          checkSection(section.child);
        }
      }

      if (section.validation && section.fieldName) {
        const value = data[section.fieldName];
        const result = section.validation(value, "", data);
        console.log("result", result);
        if (result && !result.isValid) {
          isValid = false;
        }
      }
    };

    json.forEach((section) => checkSection(section));
    return isValid;
  };

  const getConfig = useMemo(() => {
    let data: any = {};
    data.type = [
      { label: "quiz", value: "quiz" },
      { label: "form", value: "form" },
      { label: "custom", value: "custom" },
    ];
    data.form = formList;
    data.department = taskList;
    // console.log(data);
    return data;
  }, [formList, taskList]);
  return (
    <div className="card p-0 m-0">
      <div className="card-body p-0">
        <CommonForm
          formJson={addTaskJson}
          fieldData={formData}
          onChangeInput={onChangeInput}
          onChangeSelect={onChangeSelect}
          onSearchSelect={onSearchSelect}
          onClickField={onClickField}
          configData={getConfig}
          isCheckValid={isCheckValid}
        />
      </div>
    </div>
  );
};

export default TaskAdd;
