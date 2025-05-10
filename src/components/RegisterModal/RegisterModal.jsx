import React, { useState } from "react";
import { authorize, register, checkToken } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  openLoginModal,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isSubmitDisabled = !email || !password || !name;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        clearForm();
        onClose();
      })
      .catch((err) => {
        console.error("register failed:", err);
      });
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign Up"
      onSubmit={handleSubmit}
      buttonText="Sign Up"
      isSubmitDisabled={isSubmitDisabled}
      footer={
        <span className="modal__switch">
          or{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={() => {
              clearForm();
              onClose();
              openLoginModal();
            }}
          >
            Log In
          </button>
        </span>
      }
    >
      <label
        className={`modal__label ${!isEmailValid ? "modal__label_error" : ""}`}
      >
        Email* {!isEmailValid && "(this is not an email address)"}
        <input
          type="email"
          id="register-email"
          name="email"
          className={`modal__input ${
            !isEmailValid ? "modal__input_error" : ""
          }`}
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          autoComplete="email"
        />
      </label>

      <label className="modal__label">
        Password *
        <input
          type="password"
          id="register-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </label>

      <label className="modal__label">
        Name *
        <input
          type="text"
          id="register-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </label>

      <label className="modal__label">
        Avatar URL (optional)
        <input
          type="url"
          id="register-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          autoComplete="url"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
