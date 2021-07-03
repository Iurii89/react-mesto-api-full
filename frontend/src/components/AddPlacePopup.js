import { useState } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, ...props }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function nameChange(e) {
    setName(e.target.value);
  }

  function linkChange(e) {
    setLink(e.target.value);
  }

  function addPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });

    setName("");
    setLink("");
  }

  return (
    <>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={addPlaceSubmit}
      >
        <input
          type="text"
          value={name}
          onChange={nameChange}
          className="popup__input popup__input_name-profile"
          name="name"
          id="profile-input-name"
          minLength="2"
          maxLength="40"
          placeholder="Название карточки"
          required
        />
        <span
          className="popup__input-error"
          id="profile-input-name-error"
        ></span>
        <input
          type="text"
          value={link}
          onChange={linkChange}
          className="popup__input popup__input_job-profile"
          name="about"
          id="prifile-input-job"
          minLength="2"
          maxLength="200"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="popup__input-error"
          id="prifile-input-job-error"
        ></span>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
