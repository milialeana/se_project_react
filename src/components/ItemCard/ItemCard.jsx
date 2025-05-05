import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeIcon from "../../assets/like-button.svg";
import likedIcon from "../../assets/liked-button.svg";

function ItemCard({ card, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.includes(currentUser?._id);

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(card);
  };

  return (
    <li className="card">
      <div className="card__caption-container">
        <h2 className="card__name">{card.name}</h2>

        {currentUser && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_liked" : ""
            }`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike item" : "Like item"}
            aria-pressed={isLiked}
          >
            <img
              src={isLiked ? likedIcon : likeIcon}
              alt="Like button"
              className="card__like-icon"
            />
          </button>
        )}
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
