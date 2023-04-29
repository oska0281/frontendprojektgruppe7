
import { useState, useEffect } from "react";
import { useKurv } from "../kontekst/KurvKontekst";
import "../styling/navigationbar.css";

interface NavigationsbarProps {
  onNavClick: (newPath: string) => void;
}

export function Navigationsbar(props: NavigationsbarProps) {
  const { aabenKurv, kurvAntal } = useKurv();
  const isOverNine = kurvAntal >= 10;
  const adjustedPadding = isOverNine ? { padding: "2px 5px" } : {};
  const displayAntal = isOverNine ? "9+" : kurvAntal;

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
          <a
            href="/logind"
            onClick={() => props.onNavClick("/logind")}
            className="navbar-navlink-login">
            Log ind
          </a>
        </div>

        <button onClick={aabenKurv} className="navbar-btn-cart">
          <img
            className="navbar-shop-cart"
            src="../public/images/shopping-cart.svg"
            alt="Shopping-cart"
          />
          {kurvAntal > 0 && (
            <div className="navbar-amount-cart" style={{ ...adjustedPadding }}>
              {displayAntal}
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}
