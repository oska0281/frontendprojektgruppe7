import React, { useState, useEffect } from 'react';
import { KurvProvider } from "./kontekst/KurvKontekst";
import { Navigationsbar } from "./komponenter/Navigationsbar";
import { Levering } from "./pages/Levering";
import { Butik } from "./pages/Butik";
import { Betaling } from "./pages/Betaling";
import Loading from './komponenter/Loading';
import { Logind } from "./pages/Logind";
import { OrderSummary } from "./pages/OrderSummary";

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
      case '/delivery':
        return <Delivery />;
      case '/payment':
        return <Payment />;
      case '/login': // added case for login page
        return <Login />;
      case '/register':
        return <Register />;
      default:
        return <Store />;
        case '/ordersummary': // added case for ordersummary page
      return <OrderSummary />;

    }
  };

  return (
    <CartProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navigationsbar onNavClick={setPath} />
          <div className="app-con">
            {renderPage()}
          </div>
        </>
      )}
    </CartProvider>
  );
}

export default App;
