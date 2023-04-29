import { formater } from "../utilities/formater";
import { useKurv } from "../kontekst/KurvKontekst";
import { useState, useEffect } from "react";
import { Vare } from "./Vare";
import "../styling/cart.css";

type ShoppingCartProps = {
  erAaben: boolean;
};

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string | null;
  imageUrl: string;
  antal?: number;
}

export function Kurv({ erAaben }: ShoppingCartProps) {
  const { lukKurv, kurvVarer, kurvAntal } = useKurv();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const total = kurvVarer.reduce((total, kurvVarer) => {
    const item = products.find((i) => i.id === kurvVarer.id);
    return total + (item?.price || 0) * kurvVarer.antal;
  }, 0);

  const calculateTax = (itemPrice: number) => {
    const taxRate = 0.25; // 25% moms
    return itemPrice * taxRate;
  };

  const totalTax = kurvVarer.reduce((taxTotal, kurvVarer) => {
    const item = products.find((i) => i.id === kurvVarer.id);
    let price = item?.price || 0;

    const itemTotal = price * kurvVarer.antal;
    const itemTax = calculateTax(itemTotal);

    return taxTotal + itemTax;
  }, 0);

  const calculateDiscount = (
    itemPrice: number,
    itemQuantity: number,
    rebateQuantity?: number,
    rebatePercent?: number
  ) => {
    if (rebateQuantity && itemQuantity >= rebateQuantity) {
      return itemPrice * itemQuantity * (rebatePercent! / 100);
    }
    return 0;
  };

  const totalDiscount = kurvVarer.reduce((discountTotal, cartItem) => {
    const item = products.find((i) => i.id === cartItem.id);
    let price = item?.price || 0;
    let rebateQuantity = item?.rebateQuantity;
    let rebatePercent = item?.rebatePercent;
    let quantity = cartItem.antal;

    return (
      discountTotal +
      calculateDiscount(price, quantity, rebateQuantity, rebatePercent)
    );
  }, 0);

  const adjustedTotal = total - totalDiscount;
  const rebate = adjustedTotal >= 300 ? adjustedTotal * 0.1 : 0;
  const totalPrice = adjustedTotal - rebate;

  const handleCheckoutClick = () => {
    lukKurv();
    window.location.href = '/levering';
  };



return (
  <div className={`cart-offcanvas ${erAaben ? "show" : ""}`}>
    <div className="cart-offcanvas-header">
      <h5 className="cart-offcanvas-title">Din indkøbskurv</h5>
      <button type="button" className="cart-close" onClick={lukKurv}>
        &times;
      </button>
    </div>
    <div className="cart-offcanvas-body">
      <div className="cart-item-list">
        {kurvVarer.map((item) => {
          const product = products.find((product) => product.id === item.id);
          return (
            <Vare
              key={item.id}
              id={item.id}
              navn={product?.name || ""}
              pris={product?.price || 0}
              antal={item.antal}
              imageUrl={product?.imageUrl || ""}
            />
          );
        })}
      </div>
      <div className="total-sb-cart">Sum: <span className="cart-sb-total">{formater(totalPrice)}</span></div>
      <div className="titles-sb-cart">Moms: <span className="cart-sb-values">{formater(totalTax)}</span></div>
      <div className="titles-sb-cart">
        Mængderabat: <span className="cart-sb-values">{formater(totalDiscount)}</span>
      </div>
      {adjustedTotal >= 300 && (
        <div className="titles-sb-cart">
          Rabat over 300: <span className="cart-sb-values">{formater(rebate)}</span>
        </div>
      )}

      {kurvAntal > 0 && (
        <button onClick={handleCheckoutClick} className="cart-btn-next">
          FORTSÆT TIL KASSEN
        </button>
      )}
    </div>
  </div>
);
}
