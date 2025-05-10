import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setErrorMessage("");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar: avatar.trim() });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save changes"}
      customButtonClassName="modal__submit_type_edit-profile"
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          id="edit-name"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </label>
      <label className="modal__label">
        Avatar (optional)
        <input
          type="url"
          id="edit-avatar"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          autoComplete="url"
        />
      </label>

      {errorMessage && <p className="modal__error-message">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default EditProfileModal;
