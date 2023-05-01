import React, { useState } from "react";
import { ValidationLogin } from "../utilities/ValidationLogin";
import "../styling/login.css";
import axios, { AxiosError } from "axios";
import { useUser } from "../context/UserContext";

interface values {
  email: string;
  password: string;
}

export function Login() {
  const { setUser } = useUser();

  const [values, setValues] = useState<values>({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {	
    event.preventDefault();	
    setServerError(""); // Clear any existing server errors	
    try {	
      const res = await axios.post("http://localhost:3000/auth/signin", values);	
      localStorage.setItem("token", res.data.token); // Save the token to localStorage	
      setUser({ name: res.data.user.name }); // Set the user in the context	
      window.location.href = "/"; // navigate to the home page using the native browser API	
    } catch (err) {	
      if (err.response) {	
        setServerError(	
          (err as AxiosError).response?.data.message ||	
            "An error occurred. Please try again later."	
        );	
      } else {	
        setServerError("An error occurred. Please try again later.");	
      }	
    }
  };



  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>	
    setValues((prev) => ({	
      ...prev,	
      [event.target.name]: event.target.value,	
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