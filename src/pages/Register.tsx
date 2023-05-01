import React, { useState } from "react";
import ValidationRegister, { Registervalidering } from "../utilities/ValidationRegister";
import axios from "axios";

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
        <div className="d-flex justify-content-center align-items-center bg-primary ">	
          <div className="bg-white p-3 rounded w-50 text-center mt-5 pt-5 pb-5 mb-5">	
            <h2>Opret bruger</h2>	
            <form action="" onSubmit={handleSubmit}>	
              <div className="mb-3 mt-3">	
                <label htmlFor="name">	
                  <strong>Navn</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="name"	
                  className="form-control rounded-0"	
                  type="text"	
                  placeholder="Indtast navn"	
                />	
              </div>	
              <div className="mb-3">	
                <label htmlFor="email">	
                  <strong>Email</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="email"	
                  className="form-control rounded-0"	
                  type="email"	
                  placeholder="Indtast email"	
                />	
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
              </div>	
              <div className="mb-3">	
                <label htmlFor="phoneNumber">	
                  <strong>Phone Number</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="phoneNumber"	
                  className="form-control rouded-0"	
                  type="tel"	
                  placeholder="Enter Phone Number"	
                />	
              </div>	
              <div className="mb-3">	
                <label htmlFor="address">	
                  <strong>Address</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="address"	
                  className="form-control rouded-0"	
                  type="text"	
                  placeholder="Enter Address"	
                />	
              </div>	
              <div className="mb-3">	
                <label htmlFor="zipCode">	
                  <strong>Zip Code</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="zipCode"	
                  className="form-control rouded-0"	
                  type="text"	
                  placeholder="Enter Zip Code"	
                />	
              </div>	
              <div className="mb-3">	
                <label htmlFor="town">	
                  <strong>Town</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="town"	
                  className="form-control rouded-0"	
                  type="text"	
                  placeholder="Enter Town"	
                />	
              </div>	
              <div className="mb-3">	
                <label htmlFor="country">	
                  <strong>Country</strong>	
                </label>	
                <input	
                  onChange={handleInput}	
                  name="country"	
                  className="form-control rouded-0"	
                  type="text"	
                  placeholder="Enter Country"	
                />	
              </div>	
              <button type="submit" className="btn btn-success w-100">	
                Create Profile	
              </button>	
              {serverError && <span className="text-danger">{serverError}</span>}	
              <p>By using our service, you agree to our terms</p>	
              <button	
                onClick={() => (window.location.href = "/login")}	
                className="btn btn-default border w-100"	
              >	
                Log In	
              </button>	
            </form>	
          </div>	
        </div>	
      </>	
    );	
  }