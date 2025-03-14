import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedWeather("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>

      {/* New Garment */}
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          {/* Hot */}
          <input
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            className="modal__input_type_checkbox"
            checked={selectedWeather === "hot"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>

          {/* Warm */}
          <input
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            className="modal__input_type_checkbox"
            checked={selectedWeather === "warm"}
            onChange={handleWeatherChange}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>

          {/* Cold */}
          <input
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            className="modal__input_type_checkbox"
            checked={selectedWeather === "cold"}
            onChange={handleWeatherChange}
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      {/* Preview Item Modal */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
