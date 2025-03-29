import "./ModalWithForm.css";
import closeIconGray from "../../assets/close-btn-gray.svg";

function ModalWithForm({
  children,
  name,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h3 className="modal__title">{title}</h3>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIconGray} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              isSubmitDisabled ? "modal__button_disabled" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
