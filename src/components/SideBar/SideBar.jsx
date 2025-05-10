import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const username = currentUser?.name || "Guest";
  const hasAvatar = currentUser?.avatar && currentUser.avatar.trim() !== "";

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {hasAvatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>
        )}
        <p className="sidebar__username">{username}</p>
      </div>
      <button className="sidebar__button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
