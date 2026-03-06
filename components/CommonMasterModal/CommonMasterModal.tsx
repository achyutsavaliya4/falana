import { Modal } from "react-bootstrap";
import CommonForm from "../CommonForm/CommonForm";
import clsx from "clsx";
import Button, { button, onClickFieldResolver } from "../Button/Button";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";

interface CommonMasterModalProps {
  // Required props
  title: string;
  show: boolean;
  handleToggle: () => void;
  formData: any[];
  fieldData: any;

  configData?: any;
  fullFieldData?: any;
  modalSize?: "xl" | "lg" | "sm";
  modalClassName?: string;
  headerClassName?: string;
  hideCloseButton?: boolean;
  headerTitleClassName?: string;
  modalBodyClassName?: string;
  modalFooterClassName?: string;
  hideFooter?: boolean;
  handleSubmit?: onClickFieldResolver;
  handleCancel?: onClickFieldResolver;
  cancelButtonJson?: button
  submitButtonJson?: button
  isCheckValid?: boolean;

  //   Functions
  onChangeInput?: any;
  onBlurInput?: any;
  onClickField?: any;
  onChangeSelect?: any;
  onSelectDate?: any;
  onChangeSearch?: any;
  onSearchSelect?: any;
  onRemoveSelect?: any;
}
const CommonMasterModal: React.FC<CommonMasterModalProps> = ({
  title,
  show,
  handleToggle,
  formData,
  fieldData,
  configData,
  fullFieldData,
  onChangeInput,
  onBlurInput,
  onClickField,
  onChangeSelect,
  onSelectDate,
  modalSize,
  modalClassName,
  headerClassName,
  hideCloseButton,
  headerTitleClassName,
  modalBodyClassName,
  modalFooterClassName,
  hideFooter,
  handleSubmit,
  handleCancel,
  cancelButtonJson,
  submitButtonJson,
  onChangeSearch,
  onSearchSelect,
  isCheckValid,
  onRemoveSelect
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleToggle}
        size={modalSize ?? "xl"}
        centered
        className={clsx(modalClassName)}
        restoreFocus={false}
      >
        <Modal.Header
          className={clsx(headerClassName || "py-2 px-3")}
          closeButton={hideCloseButton ? false : true}
        >
          <Modal.Title className={clsx("fs-5",headerTitleClassName)}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={clsx(modalBodyClassName)}>
          <CommonForm
            formJson={formData ?? []}
            fieldData={fieldData ?? {}}
            fullFieldData={fullFieldData ?? {}}
            configData={configData ?? {}}
            onChangeInput={onChangeInput}
            onBlurInput={onBlurInput}
            onClickField={onClickField}
            onChangeSelect={onChangeSelect}
            onSelectDate={onSelectDate}
            onChangeSearch={onChangeSearch}
            onSearchSelect={onSearchSelect}
            isCheckValid={isCheckValid}
            onRemoveSelect={onRemoveSelect}
          />
        </Modal.Body>
        {!hideFooter && (
          <Modal.Footer className={clsx(modalFooterClassName)}>
            <div className="d-flex justify-content-end gap-3">
              {hasKeys(cancelButtonJson) && <Button field={cancelButtonJson} onClickField={handleCancel} />}
              {hasKeys(submitButtonJson) && <Button field={submitButtonJson} onClickField={handleSubmit} />}
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default CommonMasterModal;
