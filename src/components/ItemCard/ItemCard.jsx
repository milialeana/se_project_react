import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.link}
        alt={item.name || "Clothing item"}
      />
    </li>
  );
}

export default ItemCard;
