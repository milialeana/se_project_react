import "./SideBar.css";
import avatarDefault from "../../assets/avatar.png";

function SideBar({ currentUser }) {
  const username = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || avatarDefault;

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="User avatar" />
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default SideBar;
