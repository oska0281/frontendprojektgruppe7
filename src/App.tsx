import React, { useState, useEffect } from 'react';

import { OrderSummary } from "./pages/OrderSummary";
import { Checkout} from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CartProvider } from "./context/CartContext";
import { Store } from "./pages/Store";
import Loading from "./components/Loading";
import { Navigationsbar } from "./components/NavigationBar";

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
      case '/checkout':
        return <Checkout />;
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
          case '/ordersummary':
      return <OrderSummary />;

      default:
        return <Store />;

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
