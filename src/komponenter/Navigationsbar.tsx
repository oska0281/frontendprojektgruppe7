
import { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import {useCart} from "../kontekst/KurvKontekst";
import '../styling/navigationbar.css';

export function Navigationsbar() {

    const { openCart, cartQuantity } = useCart();
    const isOverNine = cartQuantity >= 10;
    const adjustedPadding = isOverNine ? { padding: "2px 5px" } : {};
    const displayQuantity = isOverNine ? "9+" : cartQuantity;
  
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [hidden, setHidden] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
            <NavLink to="/" className="navbar-navlink">
              Butik
            </NavLink>
              <NavLink to="/logind"  className="navbar-login">
                       Log ind
              </NavLink>
          </div>
          <button onClick={openCart} className="navbar-btn-cart">
            <img className="navbar-shop-cart" src="../public/images/shopping-cart.svg" alt="Shopping-cart" />
            {cartQuantity > 0 && (
              <div className="navbar-amount-cart" style={{ ...adjustedPadding }}>
                {displayQuantity}
              </div>
            )}
          </button>
        </div>
      </nav>
    );
  }