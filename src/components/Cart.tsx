import { format } from "../utilities/format";
import { useCart } from "../context/KurvKontekst";
import { useState, useEffect } from "react";
import { Item } from "./Item";
import "../styling/cart.css";

type ShoppingCartProps = {
  isOpen: boolean;

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
  quantity?: number;
}

export function Cart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartProducts, cartQuantity } = useCart();
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

  const total = cartProducts.reduce((total, cartProducts) => {
    const item = products.find((i) => i.id === cartProducts.id);
    return total + (item?.price || 0) * cartProducts.quantity;
  }, 0);

  const calculateTax = (itemPrice: number) => {
    const taxRate = 0.25; // 25% moms
    return itemPrice * taxRate;
  };

  const totalTax = cartProducts.reduce((taxTotal, cartProducts) => {
    const item = products.find((i) => i.id === cartProducts.id);
    let price = item?.price || 0;

    const itemTotal = price * cartProducts.quantity;
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

  const totalDiscount = cartProducts.reduce((discountTotal, cartItem) => {
    const item = products.find((i) => i.id === cartItem.id);
    let price = item?.price || 0;
    let rebateQuantity = item?.rebateQuantity;
    let rebatePercent = item?.rebatePercent;
    let quantity = cartItem.quantity;

    return (
      discountTotal +
      calculateDiscount(price, quantity, rebateQuantity, rebatePercent)
    );
  }, 0);

  const adjustedTotal = total - totalDiscount;
  const rebate = adjustedTotal >= 300 ? adjustedTotal * 0.1 : 0;
  const totalPrice = adjustedTotal - rebate;

  const handleCheckoutClick = () => {
    closeCart();
    window.location.href = '/levering';
  };



return (
  <div className={`cart-offcanvas ${isOpen ? "show" : ""}`}>
    <div className="cart-offcanvas-header">
      <h5 className="cart-offcanvas-title">Din indkøbskurv</h5>
      <button type="button" className="cart-close" onClick={closeCart}>
        &times;
      </button>
    </div>
    <div className="cart-offcanvas-body">
      <div className="cart-item-list">
        {cartProducts.map((item) => {
          const product = products.find((product) => product.id === item.id);
          return (
            <Item
              key={item.id}
              id={item.id}
              name={product?.name || ""}
              price={product?.price || 0}
              quantity={item.quantity}
              imageUrl={product?.imageUrl || ""}
            />
          );
        })}
      </div>
      <div className="total-sb-cart">Sum: <span className="cart-sb-total">{format(totalPrice)}</span></div>
      <div className="titles-sb-cart">Moms: <span className="cart-sb-values">{format(totalTax)}</span></div>
      <div className="titles-sb-cart">
        Mængderabat: <span className="cart-sb-values">{format(totalDiscount)}</span>
      </div>
      {adjustedTotal >= 300 && (
        <div className="titles-sb-cart">
          Rabat over 300: <span className="cart-sb-values">{format(rebate)}</span>
        </div>
      )}

      {cartQuantity > 0 && (
        <button onClick={handleCheckoutClick} className="cart-btn-next">
          FORTSÆT TIL KASSEN
        </button>
      )}
    </div>
  </div>
);
}
