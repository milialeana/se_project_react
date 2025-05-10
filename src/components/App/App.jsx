import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
  updateUserInfo,
} from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import useModal from "../../hooks/useModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add Garment Modal
  const {
    isOpen: isAddGarmentModalOpen,
    openModal: openAddGarmentModal,
    closeModal: closeAddGarmentModal,
  } = useModal();

  // Preview Garment Modal
  const {
    isOpen: isPreviewModalOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal();

  // Login Modal
  const {
    isOpen: isLoginOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  // Register Modal
  const {
    isOpen: isregisterOpen,
    openModal: openRegisterModal,
    closeModal: closeRegisterModal,
  } = useModal();

  // Edit Profile Modal
  const {
    isOpen: isEditProfileOpen,
    openModal: openEditProfileModal,
    closeModal: closeEditProfileModal,
  } = useModal();

  const handleEditProfile = () => openEditProfileModal();

  // Universal submit handler
  const handleSubmit = (request, onSuccess) => {
    setIsLoading(true);
    request()
      .then((result) => {
        if (onSuccess) onSuccess(result);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Update profile
  const handleUpdateUser = ({ name, avatar }) => {
    const makeRequest = () => updateUserInfo({ name, avatar });
    const onSuccess = (updatedUser) => {
      setCurrentUser(updatedUser);
      closeEditProfileModal();
    };
    handleSubmit(makeRequest, onSuccess);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPreviewModal();
  };

  // Add garment
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const makeRequest = () =>
      addItem({ name, imageUrl, weather }).then((newItem) => {
        const formattedItem = {
          ...newItem,
          link: newItem.imageUrl || newItem.link,
        };
        setClothingItems((prevItems) => [formattedItem, ...prevItems]);
      });
    handleSubmit(makeRequest, closeAddGarmentModal);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.includes(currentUser._id);
    const request = isLiked ? removeCardLike : addCardLike;

    request(card._id)
      .then((updatedCard) => {
        updatedCard.link = updatedCard.imageUrl || updatedCard.link;
        setClothingItems((items) =>
          items.map((item) => (item._id === card._id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  };

  const handleDeleteCard = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        closePreviewModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          link: item.imageUrl || item.link,
        }));
        setClothingItems(formatted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((res) => {
          setCurrentUser({ name: res.name, avatar: res.avatar, _id: res._id });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid or expired:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={openAddGarmentModal}
              weatherData={weatherData}
              openLoginModal={openLoginModal}
              openRegisterModal={openRegisterModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardDelete={handleDeleteCard}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardDelete={handleDeleteCard}
                      onCardLike={handleCardLike}
                      onAddNewClick={openAddGarmentModal}
                      handleLogout={handleLogout}
                      handleEditProfile={handleEditProfile}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeAddGarmentModal}
            isOpen={isAddGarmentModalOpen}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            card={selectedCard}
            onClose={closePreviewModal}
            isOpen={isPreviewModalOpen}
            onDelete={handleDeleteCard}
          />
          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeLoginModal}
            openRegisterModal={openRegisterModal}
            setCurrentUser={setCurrentUser}
            setIsLoggedIn={setIsLoggedIn}
          />
          <RegisterModal
            isOpen={isregisterOpen}
            onClose={closeRegisterModal}
            openLoginModal={openLoginModal}
            setCurrentUser={setCurrentUser}
            setIsLoggedIn={setIsLoggedIn}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeEditProfileModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
