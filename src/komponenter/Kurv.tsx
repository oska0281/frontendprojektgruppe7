import {Button, Offcanvas, Stack} from "react-bootstrap";
import products from "../data/produkter.json";
import {formater} from "../utilities/formater";
import {KurvProvider, useKurv} from "../kontekst/KurvKontekst";
import React from "react";
import {Vare} from "./Vare";
import {Link} from "react-router-dom";


type ShoppingCartProps = {
  erAaben: boolean;
};


export function Kurv({ erAaben }: ShoppingCartProps) {
  const { lukKurv, kurvVarer,kurvAntal } = useKurv();

  const total = kurvVarer.reduce((total, kurvVarer) => {
    const item = products.find((i) => i.id === kurvVarer.id);
    return total + (item?.pris || 0) * kurvVarer.antal;
  }, 0);
const calculateTax = (itemPrice: number) => {
  const taxRate = 0.25; // 25% moms
  return itemPrice * taxRate;
};

const totalTax = kurvVarer.reduce((taxTotal, kurvVarer) => {
  const item = products.find((i) => i.id === kurvVarer.id);
  let price = item?.pris || 0;

  const itemTotal = price * kurvVarer.antal;
  const itemTax = calculateTax(itemTotal);

  return taxTotal + itemTax;
}, 0);
const calculateDiscount = (itemPrice: number, itemQuantity: number, rebateQuantity?: number, rebatePercent?: number) => {
  if (rebateQuantity && itemQuantity >= rebateQuantity) {
    return itemPrice * itemQuantity * (rebatePercent! / 100);
  }
  return 0;
};

const totalDiscount = kurvVarer.reduce((discountTotal, cartItem) => {
  const item = products.find((i) => i.id === cartItem.id);
  let price = item?.pris || 0;
  let rebateQuantity = item?.rebateQuantity;
  let rebatePercent = item?.rebatePercent;
  let quantity = cartItem.antal;

  return discountTotal + calculateDiscount(price, quantity, rebateQuantity, rebatePercent);
}, 0);

const adjustedTotal = total - totalDiscount;
const rebate = adjustedTotal >= 300 ? adjustedTotal * 0.1 : 0;
const totalPrice = adjustedTotal - rebate;

return (
  <Offcanvas show={erAaben} onHide={lukKurv} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={4}>
        {kurvVarer.map(item => (
                <Vare key={item.id} {...item} />
        ))}
        {adjustedTotal >= 300 && (
          <div className="ms-auto fw-bold fs-5 text-muted">
            Rabat over 300: {formater(rebate)}
          </div>
        )}
        <div className="ms-auto fw-bold fs-5 text-muted">
          Heraf moms: {formater(totalTax)}
        </div>
        <div className="ms-auto fw-bold fs-5 text-muted">
          Mængderabat: {formater(totalDiscount)}
        </div>
        <div className="ms-auto fw-bold fs-5 font-weight-bold">
          Total: {formater(totalPrice)}
        </div>

        {kurvAntal > 0 && (
                <Link to="/levering">
              <Button onClick={lukKurv} variant="primary" className="w-100 mt-3">Næste</Button>
            </Link>
                )}

      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
);}
