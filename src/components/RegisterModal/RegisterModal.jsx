import React, { useState } from "react";
import "./RegisterModal.css";
import { authorize, register, checkToken } from "../../utils/auth";
import closeIconGray from "../../assets/close-btn-gray.svg";

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

  if (!isOpen) return null;

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

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIconGray} alt="Close" />
        </button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label
            className={`modal__label ${
              !isEmailValid ? "modal__label_error" : ""
            }`}
          >
            Email* {!isEmailValid && "(this is not an email address)"}
            <input
              type="email"
              className={`modal__input ${
                !isEmailValid ? "modal__input_error" : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label className="modal__label">
            Password *
            <input
              type="password"
              className="modal__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Name *
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL (optional)
            <input
              type="url"
              className="modal__input"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__register"
              disabled={isSubmitDisabled}
            >
              Sign Up
            </button>
            <p className="modal__switch">
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
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
