import "../pages/index.css";
import Main from "./Main";
import { useEffect, useState, React } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const history = useHistory();
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false); //Попап регистрации
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] =useState(false); 
  const [userEmail, setUserEmail] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setLoggedIn(true)

      history.push('/')

      Promise.all([api.getUserData(), api.getCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
          setUserEmail(userData.email);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [history, isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen]);

  function signOut(){
    localStorage.removeItem('token');
    history.push('/login');
    setLoggedIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (i) => i === currentUser._id
    );

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((cardsServer) => {
        cardsServer.map((newCard) => {
          if (newCard._id === card._id) {
            const newCards = cards.map((c) =>
              c._id === card._id ? newCard : c
            );
            setCards(newCards);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((res) => {
        const newCards = cards.filter((cardLast) => cardLast._id !== card._id);
        setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function onInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .sendEditProfile(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .changeAvatar(userAvatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlace(cardData) {
    api
      .sendNewCard(cardData)
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route path="/register">
            <Register 
              isInfoTooltipPopupOpen={isInfoTooltipPopupOpen}
              onInfoTooltip={onInfoTooltip}
              closePopup={closeAllPopups}
            />
          </Route>
          
          <Route path="/login">
            <Login
              handleLogin={handleLogin}
              isInfoTooltipPopupOpen={isInfoTooltipPopupOpen}
              onInfoTooltip={onInfoTooltip}
              closePopup={closeAllPopups}
            />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            handleUpdateUser={handleUpdateUser}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            handleUpdateAvatar={handleUpdateAvatar}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            handleAddPlace={handleAddPlace}
            selectedCard={selectedCard}
            email={userEmail}
            exit={signOut}
            component={Main}
          />

          <Route>
            {loggedIn ? <Redirect to="/login" /> : <Redirect to="/register" />}
          </Route>

          </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
