function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <form
          action="#"
          onSubmit={onSubmit}
          className="popup__form"
          name={name}
          noValidate
        >
          <fieldset className="popup__form-main-container">
            <h2 className="popup__title">{title}</h2>

            {children}

            <button className="popup__save" type="submit">
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
