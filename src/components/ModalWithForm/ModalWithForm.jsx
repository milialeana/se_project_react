import Modal from "../Modal/Modal.jsx";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  footer,
  customButtonClassName,
}) {
  if (!isOpen) return null;

  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h3 className="modal__title">{title}</h3>
      <form onSubmit={onSubmit} className="modal__form" name={name}>
        {children}
        <div className="modal__actions">
          <button
            type="submit"
            className={`modal__submit ${
              isSubmitDisabled ? "modal__submit_disabled" : ""
            } ${customButtonClassName || ""}`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
          {footer}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
