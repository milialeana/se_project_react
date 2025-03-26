import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({ onClose, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="clothing-name"
          className="modal__input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        <span className="modal__error" id="place-name-error" />
      </label>

      <label className="modal__label">
        Image
        <input
          type="text"
          name="link"
          id="clothing-link"
          className="modal__input modal__input_type_url"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
        <span className="modal__error" id="place-link-error" />
      </label>

      <fieldset className="modal__fieldset modal__fieldset_radio">
        <legend className="modal__legend">Select the weather type:</legend>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceHot"
            name="weatherType"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          <label className="modal__label_type_radio" htmlFor="choiceHot">
            Hot
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceWarm"
            name="weatherType"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <label className="modal__label_type_radio" htmlFor="choiceWarm">
            Warm
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceCold"
            name="weatherType"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <label className="modal__label_type_radio" htmlFor="choiceCold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
