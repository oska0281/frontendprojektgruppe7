import React, { useState } from "react";
import ValidationRegister, { Registervalidering } from "../utilities/ValidationRegister";
import axios from "axios";

interface values {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const [values, setValues] = useState<values>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(ValidationRegister(values));

    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:5173/registrer", values)
        .then((res) => {
          window.location.href = "/login"; // navigate to login page using the native browser API
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    return (
    <div className="containerLogin">
      <h2>Opret bruger</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">navn</label>
        <input
          onChange={handleInput}
          name="name"
          type="text"
          placeholder="Indtast name"
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInput}
          name="email"
          type="email"
          placeholder="Indtast Email"
        />
        {errors.email && (
          <span className="text-danger">{errors.email}</span>
        )}
        <label htmlFor="password">kodeord</label>
        <input
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Indtast password"
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
        <button type="submit">Opret Profil</button>
        <p>Ved brug erklærer du dig enig i vores vilkår</p>
        <button type="button" onClick={() => (window.location.href = "/login")}>
          Log Ind
        </button>
      </form>
    </div>
  );
}