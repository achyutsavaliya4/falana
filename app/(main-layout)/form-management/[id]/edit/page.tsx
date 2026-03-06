"use client";
import { useParams } from "next/navigation";
import CommonForm from "@/components/CommonForm/CommonForm";
import {
  addFormJson,
  addQuestionButton,
  addQuestionModal,
  publishFormJson,
} from "@/commonJson/form-management/add";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CommonMasterModal from "@/components/CommonMasterModal/CommonMasterModal";
import Button, { button } from "@/components/Button/Button";
import { RenderEngine } from "@/components/RenderEngine/RenderEngine";
import formModalJson from "@/commonJson/formModalJson";
import {
  EditForm,
  getFormList,
} from "@/redux/actions/formManagementAction/formManagementAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { initialFieldJson } from "@/commonJson/form-management/initialFIeldJson";
import { defaultFormTags, defaultFormValidity } from "@/utils/constants";
import useCheckValidation from "@/hooks/useCheckValidation";

const EditFormPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { formsList } = useSelector((state: RootState) => state.forms);
  const { id } = params;
  const checkValidation = useCheckValidation();
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [formConfigurations, setFormConfigurations] = useState<any>({
    tags: defaultFormTags[2].value,
    visibility: defaultFormValidity[2].value,
  });
  const [properties, setProperties] = useState<any[]>([]);
  const addFormConfig = useMemo(
    () => ({
      tags: [
        { value: "tag1", label: "Tag 1" },
        { value: "tag2", label: "Tag 2" },
        { value: "tag3", label: "Tag 3" },
      ],
      visibility: [
        {
          label: "Published",
          value: "public",
        },
        {
          label: "Draft - not publicly accessible",
          value: "draft",
        },
        {
          label: "Closed - won't accept new submissions",
          value: "closed",
        },
      ],
    }),
    [],
  );
  const getConfig = useMemo(
    () => ({
      options: [
        { label: "Option 1", value: true },
        { label: "Option 2", value: false },
      ],
      customization_select: [
        { label: "Option 1", value: true },
        { label: "Option 2", value: false },
      ],
    }),
    [],
  );
  const handleClickAddQuestionButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>, field: button) => {
      if (field?.fieldName === "add_question") {
        setShowAddQuestion(true);
      }
    },
    [],
  );
  const handleClickAddQuestionModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, field: any) => {
      e.preventDefault();

      setFormConfigurations((prev: any) => ({
        ...prev,
        properties: [
          ...(prev?.properties || []),
          (initialFieldJson as any)[field?.fieldName],
        ],
      }));
      setShowAddQuestion(false);
    },
    [],
  );
  const handleClickSettings = (
    e: MouseEvent<HTMLButtonElement>,
    field: any,
  ) => {
    if (field?.fieldName === "copy_question") {
    } else if (field?.fieldName === "delete_question") {
    } else if (field?.fieldName === "settings") {
      setShowConfigModal(true);
    }
  };
  const handleChangeAddForm = (
    e: ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    // console.log("eeetestet", e.target.value, field?.fieldName, field);
    setFormConfigurations((prev: any) => ({
      ...prev,
      [field?.fieldName]: e.target.value,
    }));
  };
  const handleSelectAddForm = (
    e: ChangeEvent<HTMLSelectElement>,
    field: any,
  ) => {
    // console.log("eeetestet", e.target.value, field?.fieldName, field);
    setFormConfigurations((prev: any) => ({
      ...prev,
      [field?.fieldName]: e.target.value,
    }));
  };
  const onClickPublishForm = async () => {
    const isValid = await checkValidation(addFormJson, formConfigurations);
    console.log("isValidisValid", isValid, formConfigurations);
    setIsCheckValid(true);
    if (isValid) {
      setIsCheckValid(false);
      dispatch(
        EditForm(formConfigurations?.id, { ...formConfigurations, properties } as any),
      );
    }
  };
  useEffect(() => {
    dispatch(getFormList({ workspaceId: 9 }));
  }, []);
  console.log("idid", id);
  useEffect(() => {
    const { properties, ...form } =
      formsList?.find((form) => form?.slug === id) || {};
    console.log("formform", form);
    setProperties(properties || []);
    setFormConfigurations(form || {});
  }, [id, formsList]);
  return (
    <>
      <BreadCrumbs />
      <Button
        field={publishFormJson as any}
        fieldData={formConfigurations}
        fullFieldData={{}}
        configData={{}}
        onClickField={onClickPublishForm}
      />
      <CommonForm
        formJson={addFormJson}
        fieldData={formConfigurations}
        configData={addFormConfig}
        isCheckValid={isCheckValid}
        onChangeInput={handleChangeAddForm}
        onChangeSelect={handleSelectAddForm}
      />
      {(properties || []) && (
        <RenderEngine
          schema={properties || []}
          onClickFieldQuestionSettings={handleClickSettings}
        />
      )}
      <CommonForm
        formJson={addQuestionButton}
        fieldData={{}}
        onClickField={handleClickAddQuestionButton}
      />
      <CommonMasterModal
        formData={addQuestionModal}
        show={showAddQuestion}
        handleToggle={() => setShowAddQuestion(false)}
        title="Add Question"
        fieldData={{}}
        configData={{}}
        onClickField={handleClickAddQuestionModal}
        modalClassName="add-question-modal"
        hideFooter={true}
      />
      <CommonMasterModal
        formData={formModalJson}
        show={showConfigModal}
        handleToggle={() => {
          setShowConfigModal(false);
        }}
        title="Config Modal"
        fieldData={{}}
        configData={getConfig}
      />
    </>
  );
};

export default EditFormPage;
