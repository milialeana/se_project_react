import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick }) {
  return (
    <div>
      <div className="clothes-section__add">
        <p className="clothes-section__add-items">Your items</p>
        <button className="clothes-section__add-button">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((filteredCard) => (
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
