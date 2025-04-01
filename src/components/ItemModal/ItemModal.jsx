import "./ItemModal.css";
import closeIconWhite from "../../assets/close-btn-gray.svg";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onClose, onDelete, card }) {
  useModalClose(isOpen, onClose);

  if (!isOpen || !card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_icon"
          aria-label="Close preview"
        >
          <img src={closeIconWhite} alt="Close" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className="modal__delete-button"
            onClick={() => onDelete(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
