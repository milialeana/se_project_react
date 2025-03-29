import "./ItemCard.css";

function ItemCard({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <img
        onClick={() => handleCardClick(card)}
        className="card__image"
        src={card.link}
        alt={card.name || "Clothing item"}
      />
    </li>
  );
}

export default ItemCard;
