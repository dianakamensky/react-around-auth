import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Logo from "../images/Vector.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);

  React.useEffect(initCurrentUser, []);

  React.useEffect(getCards, []);

  function initCurrentUser() {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .updateCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error liking card: ${err}`));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((error) => console.log(error));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddLocationClick() {
    setAddPlacePopupState(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleUpdateUser(info) {
    api
      .saveProfile(info)
      .then((response) => setCurrentUser(response))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(link) {
    api
      .saveAvatar(link)
      .then((response) => setCurrentUser(response))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(info) {
    api
      .saveLocation(info)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard(null);
  }

  function getCards() {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => window.alert(`Error loading initial cards: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header img={Logo} alt="Around the U.S" />

      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>

        <ProtectedRoute exact path="/">
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddLocationClick}
            onEditAvatarClick={handleEditAvatarClick}
            setSelectedCard={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer footerCR={`© ${new Date().getFullYear()} Around The U.S`} />
          <ImagePopup
            onClose={closeAllPopups}
            image={selectedCard?.link}
            caption={selectedCard?.name}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </ProtectedRoute>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
