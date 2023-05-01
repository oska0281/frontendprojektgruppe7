import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "../styling/mobilepayPlaceholder.css";

export function Mobilepay() {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const handlePhoneInputChange = (value: string) => {
    setValue(value);
    const isPhoneNumberValid =
      !!value && value.replace(/\D/g, "").length === 10;
    setIsPhoneNumberValid(isPhoneNumberValid);
  };

  return (
    <div className="containerMobilepay">
      <img
        className="mobilepay-logo"
        src="../public/images/mobilepay-logo.svg"
        alt="Mobilepay Logo"
      />
      <p className="placeholder-text">Placeholder for Mobilepay API - altså bare en telefon nr godkender</p>
      <div className="phone-input-container">
        <PhoneInput
          className="mp-phone-input"
          type="text"
          required
          maxLength={11}
          pattern="\d*"
          defaultCountry="DK"
          value={value}
          onChange={handlePhoneInputChange}
          placeholder="12 34 56 78"
        />
        {!isPhoneNumberValid && value && (
          <p className="error-message">Not a valid phone number</p>
        )}
      </div>
      {isPhoneNumberValid && (
        <button className="success-button">
          Tillykke! Du kan se denne knap, dog har vi ikke noget CVR nummer endnu, så Mobilepay kommer ikke rigtigt til at fungere :)
        </button>
      )}
    </div>
  );
}