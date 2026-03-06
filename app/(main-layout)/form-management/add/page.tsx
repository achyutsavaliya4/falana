"use client";
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
import forms from "@/dummyJsona/masterExtractedShort.json";
import { RenderEngine } from "@/components/RenderEngine/RenderEngine";
import formModalJson from "@/commonJson/formModalJson";
import { initialFieldJson } from "@/commonJson/form-management/initialFIeldJson";
import useCheckValidation from "@/hooks/useCheckValidation";
import { createForm } from "@/redux/actions/formManagementAction/formManagementAction";
import { useDispatch } from "react-redux";
import { defaultFormTags, defaultFormValidity } from "@/utils/constants";
import configOptions from "@/dummyJsona/statics.json";
import PageHeader from "@/components/PageHeader/PageHeader";
import { cancelButtonJson, submitButtonJson } from "@/commonJson/common-master-modal/footer";
const initialFormValues = {
  workspace_id: 9,

  notifies: false,
  slack_notifies: false,
  send_submission_confirmation: false,
  webhook_url: null,
  notification_settings: {},
  theme: "default",
  width: "centered",
  dark_mode: "auto",
  color: "#3B82F6",
  hide_title: false,
  no_branding: false,
  uppercase_labels: true,
  transparent_background: false,
  closes_at: null,
  closed_text:
    "This form has now been closed by its owner and does not accept submissions anymore.",
  auto_save: true,
  submit_button_text: "Submit",
  re_fillable: false,
  re_fill_button_text: "Fill Again",
  submitted_text:
    "Amazing, we saved your answers. Thank you for your time and have a great day!",
  notification_sender: "Medkart",
  notification_subject: "We saved your answers",
  notification_body:
    "Hello there 👋 <br>This is a confirmation that your submission was successfully saved.",
  notifications_include_submission: true,
  use_captcha: false,
  is_rating: false,
  rating_max_value: 5,
  max_submissions_count: null,
  max_submissions_reached_text:
    "This form has now reached the maximum number of allowed submissions and is now closed.",
  editable_submissions_button_text: "Edit submission",
  confetti_on_submission: false,
  can_be_indexed: true,
  seo_meta: {
    page_title: null,
    page_description: null,
    page_thumbnail: null,
  },
  redirect_url: null,
  database_fields_update: null,
};

const AddForm = () => {
  const dispatch = useDispatch();
  const checkValidation = useCheckValidation();
  const [formConfigurations, setFormConfigurations] = useState({
    ...initialFormValues,
    tags: defaultFormTags[2].value,
    visibility: defaultFormValidity[2].value,
  } as any);
  const [properties, setProperties] = useState<any[]>([]);
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [configModalFieldData, setConfigModalFieldData] = useState<any>({});
  const addFormConfig = useMemo(
    () => ({
      tags: defaultFormTags,
      visibility: defaultFormValidity,
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
      align: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
      width: configOptions?.width,
      help_position: configOptions?.help_position,
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

      setProperties((prev: any) => [
        ...(prev || []),
        (initialFieldJson as any)[field?.fieldName],
      ]);
      setShowAddQuestion(false);
    },
    [],
  );
  const onChangeInput = (e: any, field: any) => {
    const { type, checked, value } = e?.target;

    const inputValue = type === "checkbox" ? checked : value;
    setConfigModalFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: inputValue,
    }));
  };
  const onChangeSelect = (e: any, field: any) => {
    setConfigModalFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: e?.target?.value,
    }));
  };

  const handleSubmitConfigModal = () => {
    const selectedIndex = configModalFieldData?.sectionIndex;
    if (!selectedIndex) return;
    setProperties((prev: any) => {
      const updatedProperties = [...prev];

      updatedProperties[selectedIndex] = configModalFieldData;
      return updatedProperties;
    });
    setShowConfigModal(false);
    setConfigModalFieldData({});
  };
  const handleClickSettings = (
    _: MouseEvent<HTMLButtonElement>,
    field: any,
    fieldData: any,
    fullFieldData: any,
    configData: any,
    fieldIndex?: number,
    sectionIndex?: number,
  ) => {
    console.log("fieldIndex", field, fieldData, fieldIndex, sectionIndex);
    if (field?.fieldName === "copy_question") {
      setProperties((prev: any) => {
        const updatedProperties = [...prev];
        updatedProperties.push(fieldData);
        return updatedProperties;
      });
    } else if (field?.fieldName === "delete_question") {
      setProperties((prev: any) => {
        const updatedProperties = [...prev];
        if (sectionIndex !== undefined) {
          updatedProperties.splice(sectionIndex, 1);
        }
        return updatedProperties;
      });
    } else if (field?.fieldName === "settings") {
      setConfigModalFieldData(fieldData);
      setShowConfigModal(true);
    }
  };
  const onChangeSwitch = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    sectionIndex?: number,
  ) => {
    setProperties((prev: any) => {
      const updated = [...prev];
      if (sectionIndex !== undefined) {
        updated[sectionIndex] = {
          ...updated[sectionIndex],
          [field?.fieldName]: e?.target?.checked,
        };
      }
      return updated;
    });
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
  const onClickPublishForm = async (
    event: MouseEvent<HTMLButtonElement>,
    field: any,
  ) => {
    if (field?.id === "publish-form") {
      console.log("publishform");
      const isValid = await checkValidation(addFormJson, formConfigurations);
      setIsCheckValid(true);
      if (isValid) {
        setIsCheckValid(false);
        dispatch(createForm({ ...formConfigurations, properties } as any));
      }
    }
  };
  console.log("formConfigurations", formConfigurations?.properties);
  console.log("propertiesproperties", properties);
  console.log("configModalFieldData", configModalFieldData);
  useEffect(() => {
    setProperties(forms);
  }, []);
  return (
    <>
      <div className="page-content">
        <PageHeader
          formJson={publishFormJson}
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
            dropdownOptions={configOptions?.sectionPriority}
            dropdownValue={"HIGH"}
            optionValue="value"
            optionKey="name"
            onChangeSwitch={onChangeSwitch}
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
          fieldData={configModalFieldData}
          configData={getConfig}
          onChangeInput={onChangeInput}
          onChangeSelect={onChangeSelect}
          handleSubmit={handleSubmitConfigModal}
          handleCancel={() => {
            setShowConfigModal(false);
            setConfigModalFieldData({});
          }}
          submitButtonJson={submitButtonJson}
          cancelButtonJson={cancelButtonJson}
        />
      </div>
    </>
  );
};

export default AddForm;
