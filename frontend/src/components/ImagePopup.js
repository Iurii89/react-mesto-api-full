function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_image-block ${card.link && "popup_is-opened"}`}>
      <div className="popup__container-image">
        <img src={card.link} alt={card.name} className="popup__image" />
        <button
          className="popup__close-button popup__close-image-button"
          type="button"
          onClick={onClose}
        ></button>
        <p className="popup__image-text">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
