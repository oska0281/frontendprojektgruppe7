import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import "../styling/Levering.css"

export function Levering() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form>

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

      <div>
        <input className="inputbox" type="checkbox" checked={isChecked} onChange={handleCheck} />
        <text>Jeg acceptere betingelserne</text>
      </div>

      {isChecked ? (
        <Link to="/betaling">
          <Button className="btn" variant="primary">
            Til Betaling
          </Button>
        </Link>
      ) : (
        <Button variant="primary" disabled={!isChecked}>
          Til Betaling
        </Button>
      )}
    </form>
  );
}
