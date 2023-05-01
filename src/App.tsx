import React, { useState, useEffect } from 'react';

import { OrderSummary } from "./pages/OrderSummary";
import { Checkout} from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CartProvider } from "./context/CartContext";
import { Store } from "./pages/Store";
import Loading from "./components/Loading";
import { Navigationsbar } from "./components/NavigationBar";
import { Mobilepay} from "./pages/Mobilepay";
import { useUser } from "./context/UserContext";	
import axios from "axios";	
const fetchUser = async (setUser: (user: User | null) => void) => {	
  try {	
    const token = localStorage.getItem("token");	
    if (!token) return;	
    const res = await axios.get("http://localhost:3000/auth/me", {	
      headers: { "x-auth-token": token },	
    });	
    setUser({ name: res.data.user.name });	
  } catch (error) {	
    console.error("Failed to fetch user:", error);	
  }	
};

function App() {
  const { setUser } = useUser();
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
    fetchUser(setUser);	
  }, [setUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (newPath: string) => {
    setPath(newPath);
    window.history.pushState(null, '', newPath);
  };

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
      case '/mobilepay':
        return <Mobilepay />;
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
          <Navigationsbar onNavClick={handleNavClick} />
          <div className="app-con">
            {renderPage()}
          </div>
        </>
      )}
    </CartProvider>
  );
}

export default App;