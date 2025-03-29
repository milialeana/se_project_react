import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [formValues, setFormValues] = useState({ name: "", link: "" });
  const [weatherType, setWeatherType] = useState("");

  const isFormValid = formValues.name && formValues.link && weatherType;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRadioChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({
      name: formValues.name,
      imageUrl: formValues.link,
      weather: weatherType,
    });

    setFormValues({ name: "", link: "" });
    setWeatherType("");
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="clothing-name"
          className="modal__input"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={formValues.name}
          onChange={handleChange}
        />
        <span className="modal__error" id="place-name-error" />
      </label>

      <label htmlFor="link" className="modal__label">
        Image
        <input
          type="text"
          name="link"
          id="clothing-link"
          className="modal__input"
          placeholder="Image URL"
          required
          value={formValues.link}
          onChange={handleChange}
        />
        <span className="modal__error" id="place-link-error" />
      </label>

      <fieldset className="modal__fieldset modal__fieldset_title">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <div key={type}>
            <input
              className="modal__radio-button"
              type="radio"
              id={`choice${type}`}
              name="weatherType"
              value={type}
              checked={weatherType === type}
              onChange={handleRadioChange}
            />
            <label
              className="modal__label_type_radio"
              htmlFor={`choice${type}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          </div>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}
