import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../styling/Levering.css"

export function Levering() {
  const [isChecked, setIsChecked] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCheckedMessage, setIsCheckedMessage] = useState(false);

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
        <input className="inputfelt" type="text"  required/>
      </div>

      <div>
        <label>Postnummer:</label>
        <input className="inputfelt" type="text" required/>
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
        <Button   variant="primary"  onClick={handleSubmit}>
          Til Betaling
        </Button>
      )}
    </form>
  );
}