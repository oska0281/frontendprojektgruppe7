import React, { useState, useEffect } from 'react';
import { CartProvider } from "./context/CartContext";
import { Navigationsbar } from "./components/NavigationBar";
import { Delivery } from "./pages/Delivery";
import { Store } from "./pages/Store";
import { Payment } from "./pages/Payment";
import Loading from './components/Loading';
import { Login } from "./pages/Login";
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
