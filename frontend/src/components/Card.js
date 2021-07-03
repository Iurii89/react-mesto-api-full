import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({
  card,
  name,
  likes,
  src,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element_like-active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        src={src}
        alt={name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="element__like-count">{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
