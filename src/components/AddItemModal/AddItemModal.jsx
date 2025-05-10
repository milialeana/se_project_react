import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setWeatherType("");
    }
  }, [isOpen, resetForm]);

  const handleRadioChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.link,
      weather: weatherType,
    });
  };

  const isSubmitDisabled = !isValid || !weatherType;

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      customButtonClassName="modal__submit_type_garment"
    >
      <label htmlFor="clothing-name" className="modal__label">
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
          value={values.name || ""}
          onChange={handleChange}
          autoComplete="name"
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label htmlFor="clothing-link" className="modal__label">
        Image
        <input
          type="url"
          name="link"
          id="clothing-link"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.link || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <span className="modal__error">{errors.link}</span>
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
