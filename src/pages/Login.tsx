import React, { useState } from "react";
import { Logindvalidering } from "../utilities/Logindvalidering";
import "../styling/login.css";

interface values {
  email: string;
  kodeord: string;
}

export function Login() {
  const [values, setValues] = useState<values>({
    email: "",
    kodeord: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    kodeord: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(Logindvalidering(values));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Log Ind</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          method="post"
          encType="application/x-www-form-urlencoded"
        >
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              className="form-control rouded-0"
              type="email"
              onChange={handleInput}
              name="email"
              placeholder="Indtast Email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Kodeord</strong>
            </label>
            <input
              className="form-control rouded-0"
              name="kodeord"
              type="password"
              onChange={handleInput}
              placeholder="Indtast Kodeord"
            />
            {errors.kodeord && (
              <span className="text-danger">{errors.kodeord}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log Ind
          </button>
          <p>Ved brug erklærer du dig enig i vores vilkår</p>
          <button
            className="btn btn-default border w-100"
            onClick={() => (window.location.href = "/registrer")}
          >
            Opret Bruger
          </button>
        </form>
      </div>
    </div>
  );
}
