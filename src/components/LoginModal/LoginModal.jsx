import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { authorize, checkToken } from "../../utils/auth";

function LoginModal({
  isOpen,
  onClose,
  openRegisterModal,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const isSubmitDisabled = !email || !password;

  const handleSubmit = (e) => {
    e.preventDefault();

    authorize({ email, password })
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
        if (err.status === 401) {
          setErrorMessage("Incorrect email or password");
        } else {
          setErrorMessage(
            err.message || "Something went wrong. Please try again."
          );
        }
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
      title="Log In"
      onSubmit={handleSubmit}
      buttonText="Log In"
      isSubmitDisabled={isSubmitDisabled}
      footer={
        <p className="modal__switch">
          or{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={() => {
              clearForm();
              onClose();
              openRegisterModal();
            }}
          >
            Sign Up
          </button>
        </p>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          id="login-email"
          name="email"
          className="modal__input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
        />
      </label>
      <label
        className={`modal__label ${errorMessage ? "modal__label_error" : ""}`}
      >
        {errorMessage || "Password"}
        <input
          type="password"
          id="login-password"
          name="password"
          className={`modal__input ${errorMessage ? "modal__input_error" : ""}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
