
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "../styling/checkout.css";
export function Checkout() {
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
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
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
    const formFields = document.querySelectorAll(
      "input.delivery-address-field"
    );
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

  const handlePaymentButton = async () => {
    if (
      isFormFilled &&
      isChecked &&
      isZipCodeValid &&
      (!isCompany || isCompanyVATNumberValid)
    ) {
      setIsPaymentEnabled(true);
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

  const handleCreditCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue
      .match(/.{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || "";
    setCreditCardNumber(formattedValue);
  };

  const isCreditCardNumberValid = () => {
    const rawValue = creditCardNumber.replace(/\D/g, "");
    return rawValue.length === 16;
  };

  const handleMobilePayButton = async () => {
    window.location.href = "/mobilepay";
  }

  return (
    <div className="paym-root">
      <div className="paym-cards-wrapper">
        <div className="paym-del-card">
          <form
            className="del-form"
            onChange={handleFormChange}
            onSubmit={(event) => event.preventDefault()}
          >
            <h1 className="titel">Levering</h1>
            <div className="company-container">
              <input
                className="company-checkbox"
                type="checkbox"
                checked={isCompany}
                onChange={handleIsCompanyChange}
              />
              <label className="del-cb-label">Virksomhed</label>
            </div>

            {!isCompany && (
              <div>
                <label className="del-label">Navn:</label>
                <input
                  className="inputfelt delivery-address-field"
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
                <label className="del-label">Virksomhed:</label>
                <input
                  className="inputfelt delivery-address-field"
                  type="text"
                  required
                />
              </div>
            )}

            {isCompany && (
              <div>
                <label className="del-label">CVR.:</label>
                <input
                  className="inputfelt delivery-address-field"
                  maxLength={8}
                  type="text"
                  required
                  onChange={handleCompanyVATNumberInputChange}
                />
              </div>
            )}

            <div>
              <label className="del-label">Email:</label>
              <input
                className="inputfelt delivery-address-field"
                type="text"
                required
              />
            </div>

            <div>
              <label className="del-label">Telefon:</label>
              <PhoneInput
                className="delivery-address-field phone-input"
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
              <label className="del-label">Adresse:</label>
              <input
                className="inputfelt delivery-address-field"
                type="text"
                required
              />
            </div>

            <div>
              <label className="del-label">Postnummer:</label>
              <input
                id="zipcode"
                className="inputfelt delivery-address-field"
                type="text"
                name="zipcode"
                required
                onChange={handleZipCodeChange}
              />
            </div>
            {zipCodeError && <span className="error">Ugyldigt postnummer</span>}
            <div>
              <label className="del-label">By:</label>
              <input
                className="inputfelt delivery-address-field"
                type="text"
                value={city}
                readOnly
              />
            </div>

            <div>
              <label className="del-label">Land:</label>
              <input
                className="inputfelt delivery-address-field"
                type="text"
                required
              />
            </div>

            {showMessage && (
              <div className="message">
                Udfyld venligst alle felterne
              </div>
            )}

            <div>
              <input type="checkbox" onChange={handleCheck} />
              <text className="del-text">
                Jeg bekræfter at have læst købsbetingelserne
              </text>
            </div>

            {isCheckedMessage && (
              <div className="message">Jeg accepterer købsbetingelserne</div>
            )}
            <div>
              <input type="checkbox" />
              <text className="del-text">Jeg vil gerne modtage mails med fremtidige tilbud</text>
            </div>

            <button
              className="del-continue-btn"
              disabled={
                !isFormFilled ||
                !isZipCodeValid ||
                !isPhoneNumberValid ||
                (isCompany && !isCompanyVATNumberValid)
              }
              onClick={handlePaymentButton}
            >
              Fortsæt til betaling
            </button>
          </form>
        </div>
        <div className={`paym-pay-card${isPaymentEnabled ? "" : " disabled"}`}>
          <h1 className="paym-heading">Betaling</h1>
          <div className="paym-c-card">
            <label htmlFor="ccn" className="paym-label">
              Kreditkortnummer
            </label>
            <input
              type="text"
              id="ccn"
              className="paym-input-ccn"
              value={creditCardNumber}
              onChange={handleCreditCardNumberChange}
            />
            <div>
              <label htmlFor="chn" className="paym-label">
                Kortindhaver
              </label>
              <input type="text" id="chn" className="paym-input-chn" />
            </div>
            <div className="paym-input-row">
              <div>
                <label htmlFor="ed" className="paym-label">
                  Udløbsdato
                </label>
                <input type="text" maxLength={2} id="ed" className="paym-input-ed" />
                <span className="paym-ed-fs">/</span>
                <input type="text" maxLength={2} id="ed" className="paym-input-ed1" />
              </div>
              <div>
                <label htmlFor="cvv" className="paym-label-cvv">
                  CVV
                </label>
                <input type="text" maxLength={3} id="cvv" className="paym-input-cvv" />
              </div>
            </div>
          </div>

          <button className="paym-pay-btn">Betal</button>
          <div className="paym-buttons-row">
            <button className="paym-alt-pm"onClick={handleMobilePayButton}>
              <img
                src="../public/images/mobilepay-logo.svg"
                alt="Mobile Pay"
                className="paym-mb-l"
              />
            </button>
            <button className="paym-alt-pm">
              <img
                src="../public/images/paypal-logo.svg"
                alt="PayPal"
                className="paym-pp-l"
              />
            </button>
            <button className="paym-alt-pm">
              <img
                src="../public/images/applepay-logo.svg"
                alt="Apple Pay"
                className="paym-ap-l"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
