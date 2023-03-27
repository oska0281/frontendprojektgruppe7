import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import products from "../data/products.json";
import { CartItem } from "./CartItem";
import { format } from "../utilities/format";




type ShoppingCartProps = {
  isOpen: boolean;
};


export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  const total = cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
const calculateTax = (itemPrice: number) => {
  const taxRate = 0.25; // 25% moms
  return itemPrice * taxRate;
};

const totalTax = cartItems.reduce((taxTotal, cartItem) => {
  const item = products.find((i) => i.id === cartItem.id);
  let price = item?.price || 0;

  const itemTotal = price * cartItem.quantity;
  const itemTax = calculateTax(itemTotal);

  return taxTotal + itemTax;
}, 0);
const calculateDiscount = (itemPrice: number, itemQuantity: number, rebateQuantity?: number, rebatePercent?: number) => {
  if (rebateQuantity && itemQuantity >= rebateQuantity) {
    return itemPrice * itemQuantity * (rebatePercent! / 100);
  }
  return 0;
};

const totalDiscount = cartItems.reduce((discountTotal, cartItem) => {
  const item = products.find((i) => i.id === cartItem.id);
  let price = item?.price || 0;
  let rebateQuantity = item?.rebateQuantity;
  let rebatePercent = item?.rebatePercent;
  let quantity = cartItem.quantity;

  return discountTotal + calculateDiscount(price, quantity, rebateQuantity, rebatePercent);
}, 0);


const adjustedTotal = total - totalDiscount;
const rebate = adjustedTotal >= 300 ? adjustedTotal * 0.1 : 0;
const totalPrice = adjustedTotal - rebate;
return (
  <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={4}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        {adjustedTotal >= 300 && (
          <div className="ms-auto fw-bold fs-5 text-muted">
            Rabat over 300: {format(rebate)}
          </div>
        )}
        <div className="ms-auto fw-bold fs-5 text-muted">
          Heraf moms: {format(totalTax)}
        </div>
        <div className="ms-auto fw-bold fs-5 text-muted">
          Mængderabat: {format(totalDiscount)}
        </div>
        <div className="ms-auto fw-bold fs-5 font-weight-bold">
          Total: {format(totalPrice)}
        </div>
      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
);}