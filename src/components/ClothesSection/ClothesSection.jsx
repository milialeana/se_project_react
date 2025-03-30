import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, handleAddClick }) {
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
        {clothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            card={filteredCard}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
