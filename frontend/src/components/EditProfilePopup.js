import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function nameChange(e) {
    setName(e.target.value);
  }

  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
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
          required
        />
        <span
          className="popup__input-error"
          id="profile-input-name-error"
        ></span>
        <input
          type="text"
          value={description}
          onChange={descriptionChange}
          className="popup__input popup__input_job-profile"
          name="about"
          id="prifile-input-job"
          minLength="2"
          maxLength="200"
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

export default EditProfilePopup;
