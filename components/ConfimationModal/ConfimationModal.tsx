import { Modal } from "react-bootstrap";
import Button, { button, onClickFieldResolver } from "../Button/Button";
import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";
import clsx from "clsx";

export type Props = {
  size?: "lg" | "sm" | "xl";
  showModal?: boolean;
  handleToggle: Function;
  title?: String;
  message: string;
  customData?: Function;
  className?: string;
  confirmButtonFieldName?: string;
  closeButton?: boolean;
  isShowEnterImage?: boolean;
  handleSubmit?: onClickFieldResolver;
  handleCancel?: onClickFieldResolver;
  cancelButtonJson?: button;
  submitButtonJson?: button;
};

function ConfirmationModal({
  message,
  showModal = false,
  handleToggle,
  customData,
  size,
  title,
  className,
  closeButton,
  handleSubmit,
  handleCancel,
  cancelButtonJson,
  submitButtonJson,
}: Props) {
  return (
    <>
      <Modal
        show={showModal}
        centered
        className={clsx(className, "common-confirmation-modal")}
        onHide={() => handleToggle?.()}
        size={size ?? "lg"}
        style={{ zIndex: 99998 }}
        restoreFocus={false}
      >
        <Modal.Header
          closeButton={closeButton ?? true}
          className={clsx("py-2 px-3 m-0")}
        >
          <Modal.Title className="">
            {title ? title : "Confirmation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <p>{message ?? ""}</p>
          {customData?.()}
        </Modal.Body>
        <Modal.Footer className="m-0 py-2">
          <div className="d-flex justify-content-end gap-2">
            {hasKeys(cancelButtonJson) && (
              <Button field={cancelButtonJson} onClickField={handleCancel} />
            )}
            {hasKeys(submitButtonJson) && (
              <Button field={submitButtonJson} onClickField={handleSubmit} />
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
