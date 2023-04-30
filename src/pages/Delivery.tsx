import React, { useEffect, useState } from "react";
import "../styling/delivery.css";
import PhoneInput from "react-phone-number-input";

export function Delivery() {
  const [isChecked, setIsChecked] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCheckedMessage, setIsCheckedMessage] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [isZipCodeValid, setIsZipCodeValid] = useState(false);
  const [city, setCity] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isCompanyVATNumberValid, setIsCompanyVATNumberValid] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    country: "Denmark",
    zipCode: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    name: "",
    phone: "",
    email: "",
    companyName: "",
    companyVATNumber: "",
  });

  const handleCheck = () => {
    setIsChecked(!isChecked);
    setIsCheckedMessage(false);
  };

  const handleFormChange = async () => {
    const formFields = document.querySelectorAll('input[type="text"]');
    const filledFields = Array.from(formFields).filter(
      (field) => (field as HTMLInputElement).value !== ""
    );
    setIsFormFilled(filledFields.length === formFields.length);
    if (deliveryAddress.zipCode) {
      const isValidZipCode = await validateZipCode(deliveryAddress.zipCode);
      setZipCodeError(!isValidZipCode);
      setIsZipCodeValid(isValidZipCode);
      if (isValidZipCode) {
        setDeliveryAddress((prevState) => ({
          ...prevState,
          city: city,
        }));
      }
    }
    if (!isCompany && !deliveryAddress.name) {
      setIsFormFilled(false);
    }
  };

  const handleButtonClick = async () => {
    if (
      isFormFilled &&
      isChecked &&
      isZipCodeValid &&
      (!isCompany || isCompanyVATNumberValid)
    ) {
      window.location.href = "/payment";
    } else {
      setShowMessage(!isFormFilled);
      setIsCheckedMessage(!isChecked);
      if (!isZipCodeValid) {
        setZipCodeError(true);
      }
    }
  };

  const validateZipCode = async (zipCode: string): Promise<boolean> => {
    if (!zipCode) {
      return false;
    }

    const response = await fetch(
      `https://api.dataforsyningen.dk/postnumre/${zipCode}`
    );
    const data = await response.json();

    if (response.ok && data && data.nr === zipCode) {
      setCity(data.navn);
      return true;
    } else {
      setCity("");
      return false;
    }
  };

  useEffect(() => {
    setDeliveryAddress((prevState) => ({ ...prevState, city: city }));
  }, [city, setDeliveryAddress]);

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryAddress((prevState) => ({
      ...prevState,
      zipCode: e.target.value,
    }));

    const isValidZipCode = await validateZipCode(e.target.value);
    setZipCodeError(!isValidZipCode);
    setIsZipCodeValid(isValidZipCode);
  };

  const [value, setValue] = useState<string | undefined>();

  const handlePhoneInputChange = (value: string) => {
    setValue(value);
    const isPhoneNumberValid =
      !!value && value.replace(/\D/g, "").length === 10;
    setIsPhoneNumberValid(isPhoneNumberValid);
  };

  const handleIsCompanyChange = () => {
    setIsCompany(!isCompany);
    if (isCompany) {
      setIsCompanyVATNumberValid(false);
    }
  };
  

  const handleCompanyVATNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const companyVATNumber = e.target.value;
    const isValidCompanyVATNumber = /^\d{8}$/.test(companyVATNumber);
    setIsCompanyVATNumberValid(isValidCompanyVATNumber);
  };

  return (
    <form
      onChange={handleFormChange}
      onSubmit={(event) => event.preventDefault()}
    >
      <h1 className="titel">Delivery</h1>
      <div className="company-container">
        <input
          className="company-checkbox"
          type="checkbox"
          checked={isCompany}
          onChange={handleIsCompanyChange}
        />
        <label>Company</label>
      </div>

      {!isCompany && (
        <div>
          <label>Name:</label>
          <input
            className="inputfelt"
            type="text"
            value={deliveryAddress.name}
            onChange={(e) =>
              setDeliveryAddress((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            required
          />
        </div>
      )}

      {isCompany && (
        <div>
          <label>Company:</label>
          <input className="inputfelt" type="text" required />
        </div>
      )}

      {isCompany && (
        <div>
          <label>VAT No.:</label>
          <input
            className="inputfelt"
            maxLength={8}
            type="text"
            required
            onChange={handleCompanyVATNumberInputChange}
          />
        </div>
      )}

      <div>
        <label>Email:</label>
        <input className="inputfelt" type="text" required />
      </div>

      <div>
        <label>Phone no:</label>
        <PhoneInput
          className="phone-input"
          type="text"
          required
          maxLength={11}
          pattern="\d*"
          defaultCountry="DK"
          value={value}
          onChange={handlePhoneInputChange}
          placeholder="12 34 56 78"
        />
      </div>

      <div>
        <label>Address:</label>
        <input className="inputfelt" type="text" required />
      </div>

      <div>
        <label>Zipcode:</label>
        <input
          id="zipcode"
          className="inputfelt"
          type="text"
          name="zipcode"
          required
          onChange={handleZipCodeChange}
        />
      </div>
      {zipCodeError && <span className="error">Ugyldigt postnummer</span>}
      <div>
        <label>City:</label>
        <input className="inputfelt" type="text" value={city} readOnly />
      </div>

      <div>
        <label>Country:</label>
        <input className="inputfelt" type="text" required />
      </div>

      {showMessage && (
        <div className="message">Please fill out every field in the form</div>
      )}

      <div>
        <input className="inputbox" type="checkbox" onChange={handleCheck} />
        <text>
          I confirm that I have read and accepted the terms of purchase
        </text>
      </div>

      {isCheckedMessage && (
        <div className="message">Please accept the terms of purchase</div>
      )}
      <div>
        <input className="inputbox" type="checkbox" />
        <text>I want to receive future emails with offers</text>
      </div>

      <button
        className="payment-btn"
        disabled={
          !isFormFilled ||
          !isZipCodeValid ||
          !isPhoneNumberValid ||
          (isCompany && !isCompanyVATNumberValid)
        }
        onClick={handleButtonClick}
      >
        Payment
      </button>
    </form>
  );
}
