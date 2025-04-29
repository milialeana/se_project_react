import "./SideBar.css";
import avatarDefault from "../../assets/avatar.png";

function SideBar({ currentUser, onEditProfile, onLogout }) {
  const username = currentUser ? currentUser.name : null;
  const avatar = currentUser ? currentUser.avatar : "";

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={avatar} alt="User avatar" />
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
