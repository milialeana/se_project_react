import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddNewClick,
  currentUser,
  handleLogout,
  handleEditProfile,
}) {
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
        />
      </section>
    </div>
  );
}

export default Profile;
