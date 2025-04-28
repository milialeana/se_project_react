import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../assets/logo.svg";

function Header({
  handleAddClick,
  weatherData,
  openLoginModal,
  openSignupModal,
  currentUser,
}) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const username = currentUser ? currentUser.name : null;
  const avatar = currentUser ? currentUser.avatar : "";

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
              {avatar ? (
                <img
                  src={avatar}
                  alt="user avatar"
                  className="header__avatar"
                />
              ) : (
                <span className="header__avatar header__avatar_none">
                  {username?.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </Link>
        )}

        {!currentUser && (
          <>
            <button
              onClick={openSignupModal}
              type="button"
              className="header__signup"
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
