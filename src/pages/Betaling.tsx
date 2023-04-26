import React from "react";

export function Betaling() {
  return (
    <div className="paym-root">
      <h1 className="paym-heading">Betaling</h1>
      <form className="paym-form">
        <input type="text" placeholder="Kreditkortnummer" className="paym-input" />
        <br />
        <input type="text" placeholder="Udløbsdato" className="paym-input" />
        <br />
        <input type="text" placeholder="CVV" className="paym-input" />
      </form>
      <button className="paym-paypal-button">Betal med PayPal</button>
      <button className="paym-apple-pay-button">Betal med Apple Pay</button>
    </div>
  );
}

const inputStyle = {
  width: "400px",
  margin: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
