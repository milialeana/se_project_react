import Modal from "../Modal/Modal.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import closeIconWhite from "../../assets/close-btn-white.svg";

function ItemModal({ isOpen, onClose, onDelete, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  if (!isOpen || !card) return null;

  return (
    <Modal
      name="preview"
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_image"
      customCloseIcon={closeIconWhite}
    >
      <img src={card.link} alt={card.name} className="modal__image" />

      {isOwn && (
        <button className="modal__delete-button" onClick={() => onDelete(card)}>
          Delete item
        </button>
      )}
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
