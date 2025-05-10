import React from "react";
import closeIconGray from "../../assets/close-btn-gray.svg";
import "./Modal.css";
import useModalClose from "../../hooks/useModalClose";

function Modal({
  name,
  isOpen,
  onClose,
  children,
  contentClassName = "",
  customCloseIcon,
}) {
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_${name} modal_opened`}>
      <div className={`modal__content ${contentClassName}`}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_icon"
        >
          <img src={customCloseIcon || closeIconGray} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
