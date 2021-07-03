import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  isEditProfilePopupOpen,
  closeAllPopups,
  handleUpdateUser,
  isEditAvatarPopupOpen,
  handleUpdateAvatar,
  isAddPlacePopupOpen,
  handleAddPlace,
  selectedCard,
  email,
  exit,

}) {
  const userContext = React.useContext(CurrentUserContext);
  return (
    <>
      <Header
        text="Выйти"
        email={email}
        exit={exit}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              src={userContext.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__title">{userContext.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button> 
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                name={card.name}
                src={card.link}
                likes={card.likes.length}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
      </main>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default Main;
