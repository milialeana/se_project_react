import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Header.css";

import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/base-avatar.png";

function Header({
  handleAddClick,
  weatherData,
  openLoginModal,
  openRegisterModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser ? currentUser.name : null;
  const avatarToShow = currentUser?.avatar?.trim()
    ? currentUser.avatar
    : avatarDefault;

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        {currentUser && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-button"
          >
            + Add Clothes
          </button>
        )}
        {currentUser && (
          <Link to="/profile" className="header__link">
            <div className="header__profile">
              <div className="header__user-name">{username}</div>
              {currentUser?.avatar?.trim?.() ? (
                <img
                  src={avatarToShow}
                  alt="user avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {username ? username.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </div>
          </Link>
        )}

        {!currentUser && (
          <>
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__register"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__login"
            >
              Log In
            </button>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
