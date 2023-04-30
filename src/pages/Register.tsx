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
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Opret bruger</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>name</strong>
            </label>
            <input
              onChange={handleInput}
              name="name"
              className="form-control rouded-0"
              type="text"
              placeholder="Indtast name"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              onChange={handleInput}
              name="email"
              className="form-control rouded-0"
              type="email"
              placeholder="Indtast Email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>password</strong>
            </label>
            <input
              onChange={handleInput}
              name="password"
              className="form-control rouded-0"
              type="password"
              placeholder="Indtast password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Opret Profil
          </button>
          <p>Ved brug erklærer du dig enig i vores vilkår</p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="btn btn-default border w-100"
          >
            Log Ind
          </button>
        </form>
      </div>
    </div>
  );
}
