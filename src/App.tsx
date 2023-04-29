import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Delivery } from "./pages/Delivery";
import { Butik } from "./pages/Butik";
import { Payment } from "./pages/Payment";
import { Navigationbar } from "./komponenter/Navigationbar";
import { CartProvider } from "./kontekst/CartContext";
import Loading from './komponenter/Loading';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navigationbar />
          <div className="app-con">
            <Routes>
      <Route path="/" element={<Butik />} />
        <Route path="/levering"  element={<Delivery  />} />
      <Route path="/betaling" element={<Payment />} />
        <Route path="/logind" element={<Login />} />
      <Route path="/registrer" element={<Register/>}/>
     </Routes>
          </div>
        </>
      )}
    </CartProvider>
  );
}

export default App;
