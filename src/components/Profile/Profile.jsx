import { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  onCardClick,
  clothingItems,
  onAddNewClick,
  onCardLike,
  handleLogout,
  handleEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={onAddNewClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
