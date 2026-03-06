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

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    let { name, value } = e.target;
    if (field?.inputType === "radio" && field?.optionValue) {
      value = field?.optionValue;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSelect = (e: any, field: any) => {
    setFormData((prev) => ({ ...prev, [field?.fieldName]: e.target.value }));
  };
  const onSearchSelect = (item: any, field: any, repeatChildIndex: number) => {
    setFormData((prev) => ({ ...prev, [field?.fieldName]: item }));
  };
  const onClickField = (
    e: React.MouseEvent<HTMLButtonElement>,
    field: button,
  ) => {
    setIsCheckValid(true);
    const isFormValid = validateFormStructure(addTaskJson, formData);
    if (isFormValid) {
    } else {
    }
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
        if (result && !result.isValid) {
          isValid = false;
        }
      }
    };

    json.forEach((section) => checkSection(section));
    return isValid;
  };

  const getConfig = useMemo(() => {
    const data: any = {};
    data.type = [
      { label: "quiz", value: "quiz" },
      { label: "form", value: "form" },
      { label: "custom", value: "custom" },
    ];
    data.form = formList;
    data.department = taskList;
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
