import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem, getUserInfo } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import useModal from "../../hooks/useModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  // Form State
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Add Garment
  const {
    isOpen: isAddGarmentModalOpen,
    openModal: openAddGarmentModal,
    closeModal: closeAddGarmentModal,
  } = useModal();

  // Preview Garment
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

  // Signup Modal
  const {
    isOpen: isSignupOpen,
    openModal: openSignupModal,
    closeModal: closeSignupModal,
  } = useModal();

  // Edit Profile Modal
  const {
    isOpen: isEditProfileOpen,
    openModal: openEditProfileModal,
    closeModal: closeEditProfileModal,
  } = useModal();

  // Profile Edit Modal
  const handleEditProfile = () => {
    openEditProfileModal();
  };

  const handleUpdateUser = ({ name, avatar }) => {
    setCurrentUser({ name, avatar });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  // Toggle F & C
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPreviewModal();
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeAddGarmentModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
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
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
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
          setCurrentUser({ name: res.name, avatar: res.avatar });
        })
        .catch((err) => {
          console.error("Token invalid or expired:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={openAddGarmentModal}
            weatherData={weatherData}
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
            currentUser={currentUser}
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
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCard}
                  onAddNewClick={openAddGarmentModal}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  handleEditProfile={handleEditProfile}
                />
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
          openSignupModal={openSignupModal}
          setCurrentUser={setCurrentUser}
        />
        <SignupModal
          isOpen={isSignupOpen}
          onClose={closeSignupModal}
          openLoginModal={openLoginModal}
          setCurrentUser={setCurrentUser}
        />
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={closeEditProfileModal}
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
