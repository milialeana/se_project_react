import React, { useState } from "react";
import "./SignupModal.css";
import { signup } from "../../utils/api";
import closeIconGray from "../../assets/close-btn-gray.svg";

function SignupModal({ isOpen, onClose, openLoginModal, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isSubmitDisabled = !email || !password || !name || !avatar;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ email, password, name, avatar })
      .then((res) => {
        console.log("Signed up!", res);
        localStorage.setItem("jwt", res.token);
        setCurrentUser({ name: res.name, avatar: res.avatar });
        onClose();
        openLoginModal();

        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");
      })
      .catch((err) => {
        console.error("Signup failed:", err);
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
          <label className="modal__label">
            Email *
            <input
              type="email"
              className="modal__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Avatar URL *
            <input
              type="url"
              className="modal__input"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__signup"
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

export default SignupModal;
