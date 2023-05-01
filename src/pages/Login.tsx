import React, { useState } from "react";
import { ValidationLogin } from "../utilities/ValidationLogin";
import "../styling/login.css";

interface values {
  email: string;
  password: string;
}

export function Login() {
  const [values, setValues] = useState<values>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(ValidationLogin(values));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    return (
    <div className="containerLoginz">
      <h2>Log Ind</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={handleInput}
          name="email"
          placeholder="Indtast Email"
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
        <label htmlFor="password">Kodeord</label>
        <input
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Indtast Kodeord"
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
        <button type="submit">Log Ind</button>
        <p>Ved brug erklærer du dig enig i vores vilkår</p>
        <button type="button" onClick={() => (window.location.href = "/register")}>
          Opret Bruger
        </button>
      </form>
    </div>
  );
}