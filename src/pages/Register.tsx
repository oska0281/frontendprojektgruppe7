import React, { useState } from "react";
import ValidationRegister, { Registervalidering } from "../utilities/ValidationRegister";
import axios from "axios";
import "../styling/register.css";

interface values {
  name: string;
  email: string;
  phoneNumber: string;	
  address: string;	
  zipCode: string;	
  town: string;	
  country: string;
  password: string;
}

export function Register() {
  const [values, setValues] = useState<values>({
    name: "",
    email: "",
    phoneNumber: "",	
    address: "",	
    zipCode: "",	
    town: "",	
    country: "",
    password: "",
  });

  const [serverError, setServerError] = useState<string>("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {	
    event.preventDefault();	
    setServerError(""); // Clear any existing server errors	
    try {	
      await axios.post("http://localhost:3000/auth/signup", values);	
      window.location.href = "/login"; // navigate to login page using the native browser API	
    } catch (err) {	
      if (err.response) {	
        setServerError(err.response.data.error);	
      } else {	
        setServerError("An error occurred. Please try again later.");	
      }	
    }	
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    return (	
      <>	
       <div className="containerRegister">
      <h2>Log Ind</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={handleInput}
          name="email"
          placeholder="Indtast Email"
        />
        <label htmlFor="password">Kodeord</label>
        <input
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Indtast Kodeord"
        />
        <label htmlFor="password">Gentag kodeord</label>
        <input
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Indtast Kodeord"
        />
        <p>Ved brug erklærer du dig enig i vores vilkår</p>
        <button type="submit" onClick={() => (window.location.href = "/store")}>Opret bruger</button>

      </form>
    </div>
      </>	
    );	
  }