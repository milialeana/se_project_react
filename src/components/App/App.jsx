import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  // Form State
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");
  const [formValues, setFormValues] = useState({ name: "", imageUrl: "" });

  // Handle input change
  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  // Handle radio button change
  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  // Handle modal close & reset
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedWeather("");
    setFormValues({ name: "", imageUrl: "" });
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
        <Header
          handleAddClick={() => setActiveModal("add-garment")}
          weatherData={weatherData}
        />
        <Main weatherData={weatherData} handleCardClick={setSelectedCard} />
        <Footer />
      </div>

      {/* New Garment Modal */}
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            autoComplete="url"
            value={formValues.imageUrl}
            onChange={handleInputChange}
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              className="modal__input_type_checkbox"
              checked={selectedWeather === "hot"}
              onChange={handleWeatherChange}
            />
            Hot
          </label>

          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              className="modal__input_type_checkbox"
              checked={selectedWeather === "warm"}
              onChange={handleWeatherChange}
            />
            Warm
          </label>

          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              className="modal__input_type_checkbox"
              checked={selectedWeather === "cold"}
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </fieldset>

        {/* Disable submit button*/}
        <button
          type="submit"
          className="modal__submit"
          disabled={
            !formValues.name || !formValues.imageUrl || !selectedWeather
          }
        >
          Add Garment
        </button>
      </ModalWithForm>

      {/* Preview Item */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
