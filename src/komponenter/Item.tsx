import { useCart } from "../kontekst/CartContext";
import "../styling/item.css";

type CartProductProps = {
  id: string;
  name  : string;
  quantity: number;
  price: number;
  imageUrl?: string;
};

export function Item({ id, name, quantity, price, imageUrl }: CartProductProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="item-row">
      <div className="item-img-con">
        <img src={imageUrl} alt={name} />
        <span className="item-amount">{quantity}</span>
      </div>
      <div className="item-details">
        <span className="item-name">{name}</span>
        <span className="item-price">Stk. pris {price} DKK </span>
        <span className="item-total">Total: {price * quantity} DKK</span>
      </div>
      <button className="item-btn-remove" onClick={() => removeFromCart(id)}>x</button>
    </div>
  );
               
}
