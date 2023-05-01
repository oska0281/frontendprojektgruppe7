import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styling/navigationbar.css";
import { useUser } from "../context/UserContext";

interface NavigationsbarProps {
  onNavClick: (newPath: string) => void;
}

export function Navigationsbar(props: NavigationsbarProps) {
  const { user, logout } = useUser();
  const { openCart, cartQuantity } = useCart();
  const isOverNine = cartQuantity >= 10;
  const adjustedPadding = isOverNine ? { padding: "2px 5px" } : {};
  const displayAntal = isOverNine ? "9+" : cartQuantity;

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setHidden(currentScrollTop > lastScrollTop && currentScrollTop > 0);
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav className={`navbar-nav ${hidden ? "navbar-hidden" : ""}`}>
      <div className="navbar-con">
        <div className="navbar-div-navlink">
          <a
            href="/"
            onClick={() => props.onNavClick("/")}
            className="navbar-navlink-store"
          >
            Butik
          </a>

          <button onClick={openCart} className="navbar-btn-cart">
          <img
            className="navbar-shop-cart"
            src="https://freesvg.org/img/1479847010.png"
            alt="Shopping-cart"
          />
          {cartQuantity > 0 && (
            <div className="navbar-amount-cart" style={{ ...adjustedPadding }}>
              {displayAntal}
            </div>
          )}
        </button>
        
        {user ? (
            <button className="navbar-navlink-username" onClick={logout}>
              Logout
            </button>
          ) : (
            <a
              href="/login"
              onClick={() => props.onNavClick("/login")}
              className="navbar-navlink-login"
            >
              <img
                className="navbar-user-login"
                src="../public/images/login.svg"
                alt="login"
              />
            </a>
          )}
        
        </div>

      </div>
    </nav>
  );
}
