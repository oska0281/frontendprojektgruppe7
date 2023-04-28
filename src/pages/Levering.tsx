import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../styling/Levering.css";

export function Levering() {
    const [isChecked, setIsChecked] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCheckedMessage, setIsCheckedMessage] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState({
        country: 'Denmark',
        zipCode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        name: '',
        phone: '',
        email: '',
        companyName: '',
        companyVATNumber: '',
    });

   const handleCheck = () => {
    setIsChecked(!isChecked);
    setIsCheckedMessage(false);
  };


  const handleFormChange = () => {
    const formFields = document.querySelectorAll('input[type="text"]');
    const filledFields = Array.from(formFields).filter((field) => (field as HTMLInputElement).value !== '');
    setIsFormFilled(filledFields.length === formFields.length);
  };

    const handleSubmit = () => {
    if (!isFormFilled) {
      setShowMessage(true);
      return;
    }

    if (!isChecked) {
      setIsCheckedMessage(true);
      return;
    }



  }


    const validateZipCode = async (zipCode: string): Promise<boolean> => {
        if (!zipCode) {
            return false;
        }

        const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipCode}`);
        const data = await response.json();

        return response.ok && data && data.nr === zipCode;
    };

    const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryAddress((prevState) => ({...prevState, zipCode: e.target.value}));

        const isValidZipCode = await validateZipCode(e.target.value);
        setZipCodeError(!isValidZipCode);
    };

    return (
        <form onChange={handleFormChange} onSubmit={handleSubmit}>
            <h1 className="titel">Levering</h1>
            <div>
                <label>Navn:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            <div>
                <label>Email:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            <div>
                <label>Telefonnummer:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            <div>
                <label>Adresse:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            <div>
                <label>
                    Postnummer
                    <input type="text" name="zipcode" required onChange={handleZipCodeChange}/>
                    {zipCodeError && <span className="error">Ugyldigt postnummer</span>}
                </label>
            </div>

            <div>
                <label>By:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            <div>
                <label>Land:</label>
                <input className="inputfelt" type="text" required/>
            </div>

            {showMessage && (
                <div className="message">Udfyld venligst alle felterne</div>
            )}
 <div>
        <input className="inputbox" type="checkbox"  onChange={handleCheck} />
        <text>Jeg bekræfter at have læst og accepteret købsbetingelserne</text>
      </div>

        {isCheckedMessage && (
        <div className="message">Accepter venligst købsbetingelserne</div>
      )}

        <div>
        <input className="inputbox" type="checkbox"  />
        <text>Jeg ønsker at modtage fremtidige mails med tilbud</text>
      </div>



      {isChecked ? (
        <Link to={isFormFilled ? "/betaling" : ""}>
          <Button className="til-betaling-btn" variant="primary" disabled={!isFormFilled} onClick={handleSubmit}>
            Til Betaling
          </Button>
        </Link>
      ) : (
        <Button  className="til-betaling-btn-disabled"  variant="primary"  onClick={handleSubmit}>
          Til Betaling
        </Button>
      )}
    </form>
  );
}