import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function EditAvatarPopup({ isOpen, onClose, ...props }) {
  const [newAvatar, setNewAvatar] = useState("");

  function avatarChange(e) {
    setNewAvatar(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(newAvatar);
    setNewAvatar("");
  }

  return (
    <>
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          value={newAvatar}
          onChange={avatarChange}
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_add-card-url"
          name="link"
          id="add-card-input-url"
          required
        />
        <span
          className="popup__input-error"
          id="add-card-input-url-error"
        ></span>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
