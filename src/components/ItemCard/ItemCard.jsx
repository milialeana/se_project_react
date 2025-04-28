import "./ItemCard.css";
import { useState } from "react";
import { likeItem } from "../../utils/api";
import likeIcon from "../../assets/like-button.svg";
import likedIcon from "../../assets/liked-button.svg";

function ItemCard({ card, onCardClick }) {
  const [liked, setLiked] = useState(card.liked);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const newLikedState = !liked;

    setIsLoading(true);
    likeItem(card._id, newLikedState)
      .then(() => {
        setLiked(newLikedState);
      })
      .catch((err) => {
        console.error("Failed to update like status:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <li className="card">
      <div className="card__caption-container">
        <h2 className="card__name">{card.name}</h2>
        <button
          className={`card__like-button ${
            liked ? "card__like-button_liked" : ""
          }`}
          onClick={handleLikeClick}
          aria-label="Like button"
          disabled={isLoading}
        >
          <img
            src={liked ? likedIcon : likeIcon}
            alt="Like button"
            className="card__like-icon"
          />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={card.link}
        alt={card.name || "Clothing item"}
      />
    </li>
  );
}

export default ItemCard;
