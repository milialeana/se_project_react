import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import closeIconGray from "../../assets/close-btn-gray.svg";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIconGray} alt="Close" />
        </button>
        <h2 className="modal__title">Change profile data</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name *
            <input
              type="text"
              className="modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Avatar *
            <input
              type="url"
              className="modal__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="modal__submit">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
