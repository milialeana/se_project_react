import React, { useState } from "react";
import "./LoginModal.css";
import { login } from "../../utils/api";
import closeIconGray from "../../assets/close-btn-gray.svg";

function LoginModal({ isOpen, onClose, openSignupModal, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const isSubmitDisabled = !email || !password;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password })
      .then((res) => {
        setCurrentUser({ name: res.name, avatar: res.avatar });
        onClose();
        setErrorMessage("");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setErrorMessage("Incorrect password");
      });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={() => {
            clearForm();
            onClose();
          }}
        >
          <img src={closeIconGray} alt="Close" />
        </button>
        <h2 className="modal__title">Log In</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label
            className={`modal__label ${
              errorMessage ? "modal__label_error" : ""
            }`}
          >
            {errorMessage || "Password"}
            <input
              type="password"
              className={`modal__input ${
                errorMessage ? "modal__input_error" : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__login ${
                isSubmitDisabled ? "modal__login_disabled" : ""
              }`}
              disabled={isSubmitDisabled}
            >
              Log In
            </button>
            <p className="modal__switch">
              or{" "}
              <button
                type="button"
                className="modal__switch-button"
                onClick={() => {
                  clearForm();
                  onClose();
                  openSignupModal();
                  setEmail("");
                  setPassword("");
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
