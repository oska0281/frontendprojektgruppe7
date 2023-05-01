import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "../styling/mobilepayPlaceholder.css";

export function Mobilepay() {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(0); // new state variable for the amount

  const handlePhoneInputChange = (value: string) => {
    setValue(value);
    const isPhoneNumberValid =
      !!value && value.replace(/\D/g, "").length === 10;
    setIsPhoneNumberValid(isPhoneNumberValid);
  };


  const handleAmountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setAmount(value);
  };

  return (
    <div className="container">
      <img
        className="mobilepay-logo"
        src="../public/images/mobilepay-logo.svg"
        alt="Mobilepay Logo"
      />
      <p className="placeholder-text">Indtast telefonnummer nedenfor</p>
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
          <p className="error-message">Telefonnummeret er ikke gyldigt</p>
        )}
      </div>
      {isPhoneNumberValid && (
        <div>
          <button className="success-button">
            Godkend betaling
          </button>
        </div>
      )}
    </div>
  );
}