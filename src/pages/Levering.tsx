import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, { useState } from 'react';

export function Levering() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form style={{padding:"10px"}}>
      <h1 style={{padding:"20px"}}>Levering</h1>
      <div style={{marginBottom:"20px"}}>
        <label>Navn:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Email:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Telefonnummer:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Adresse:</label>
        <input type="text"  required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Postnummer:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>By:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Land:</label>
        <input type="text" required/>
      </div>
      <div style={{marginBottom:"20px"}}>
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        <label>Jeg accepterer betingelserne</label>
      </div>
      {isChecked ? (
        <Link to="/betaling">
          <Button variant="primary" style={{width:"300px"}}>
            Til Betaling
          </Button>
        </Link>
      ) : (
        <Button variant="primary" style={{width:"300px"}} disabled={!isChecked}>
          Til Betaling
        </Button>
      )}
    </form>
  );
}