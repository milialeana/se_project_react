import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div>
      <div className="clothes-section__add">
        <p className="clothes-section__add-items">Your items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-button"
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            card={filteredCard}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
