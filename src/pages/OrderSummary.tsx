import { format } from "../utilities/format";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import "../styling/ordersummary.css";

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

export function OrderSummary() {
  const { cartProducts } = useCart ();
  const [ products , setProducts ] = useState<Product[]> ( [] );

  useEffect ( () => {
    fetch (
        "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
    )
        .then ( ( response ) => response.json () )
        .then ( ( data ) => {
          setProducts ( data );
        } )
        .catch ( ( error ) => {
          console.error ( error );
        } );
  } , [] );

  const total = cartProducts.reduce ( ( total , cartProducts ) => {
    const item = products.find ( ( i ) => i.id === cartProducts.id );
    return total + ( item?.price || 0 ) * cartProducts.quantity;
  } , 0 );


  const calculateTax = ( itemPrice : number ) => {
    const taxRate = 0.25; // 25% moms
    return itemPrice * taxRate;
  };

  const totalTax = cartProducts.reduce ( ( taxTotal , cartProducts ) => {
    const item = products.find ( ( i ) => i.id === cartProducts.id );
    let price = item?.price || 0;

    const itemTotal = price * cartProducts.quantity;
    const itemTax = calculateTax ( itemTotal );

    return taxTotal + itemTax;
  } , 0 );

  const calculateDiscount = (
      itemPrice : number ,
      itemQuantity : number ,
      rebateQuantity? : number ,
      rebatePercent? : number
  ) => {
    if ( rebateQuantity && itemQuantity >= rebateQuantity ) {
      return itemPrice * itemQuantity * ( rebatePercent! / 100 );
    }
    return 0;
  };

  const totalDiscount = cartProducts.reduce ( ( discountTotal , cartItem ) => {
    const item = products.find ( ( i ) => i.id === cartItem.id );
    let price = item?.price || 0;
    let rebateQuantity = item?.rebateQuantity;
    let rebatePercent = item?.rebatePercent;
    let quantity = cartItem.quantity;

    return (
        discountTotal +
        calculateDiscount ( price , quantity , rebateQuantity , rebatePercent )
    );
  } , 0 );

  const adjustedTotal = total - totalDiscount;
  const rebate = adjustedTotal >= 300 ? adjustedTotal * 0.1 : 0;
  const totalPrice: number = adjustedTotal - rebate;



    const handleButtonClick = async () => {
      window.location.href = "/checkout";
    }

 return (
  <div className="order-summary">
    <div className="order-summary__products">
      <h1 className="order-summary__heading">Ordre resumé</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
         {cartProducts.map((item) => {
  const product = products.find((product) => product.id === item.id);
  const itemTotal = (item?.quantity || 0) * (product?.price || 0);
  return (
    <tr key={item.id} className="order-summary__row">
      <td className="order-summary__product">{product?.name}</td>
      <td className="order-summary__quantity">{item?.quantity || 0}</td>
      <td className="order-summary__price">{format(product?.price || 0)}</td>
      <td className="order-summary__total">{format(itemTotal)}</td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
    <div className="order-summary__totals">
      <h1 className="order-summary__heading">Samlet pris</h1>
      <table>
        <tfoot>
          <tr>
            <td>Total før rabat:</td>
            <td>{format(total)}</td>
          </tr>
          <tr>
            <td>Heraf moms:</td>
            <td>{format(totalTax)}</td>
          </tr>
          <tr>
            <td>Mængderabat:</td>
            <td>{format(totalDiscount)}</td>
          </tr>
          {adjustedTotal >= 300 && (
            <tr>
              <td>Rabat over 300:</td>
              <td>{format(rebate)}</td>
            </tr>
          )}
          <tr>
            <td>Efter rabat:</td>
            <td>{format(totalPrice)}</td>
          </tr>
        </tfoot>
      </table>
      <button className="continue-to-Delivery__button" onClick={handleButtonClick}>Forsæt til levering</button>
    </div>
  </div>

);

}
