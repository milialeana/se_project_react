import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";
  const avatar = "";

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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            <div className="header__user-name">{username}</div>
            {avatar ? (
              <img
                src={avatar || avatarDefault}
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
      </header>
    </>
  );
}

export default Header;
