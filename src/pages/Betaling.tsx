import React from "react";

export function Betaling() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{padding:"40px"}}>Betaling</h1>
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Kreditkortnummer"
          style={inputStyle}/>
        <br/>
        <input
          type="text"
          placeholder="Udløbsdato"
          style={inputStyle}/>
        <br/>
        <input type="text" placeholder="CVV" style={inputStyle} />
      </form>
      <button  style={{width: "400px",
  marginTop:"50px",
  padding: "10px",
  backgroundColor: "#0070ba",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",}}>Betal med PayPal</button>
      <button  style={{width: "400px",
  padding: "10px",
  margin:"10px",
  backgroundColor: "#000000",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",}}>Betal med Apple Pay</button>
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
