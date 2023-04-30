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
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopstate = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/levering':
        return <Levering />;
      case '/betaling':
        return <Betaling />;
      case '/logind': // added case for logind page
        return <Logind />;
      default:
        return <Butik />;
    }
  };

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
    </KurvProvider>
  );
}

export default App;
