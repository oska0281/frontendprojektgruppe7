import {Button, Offcanvas, Stack} from "react-bootstrap";
import {useShoppingCart} from "../kontekst/KurvKontekst";
import products from "../data/products.json"
import {Vare} from "./Vare";
import {format} from "../utilities/format";
import { Link } from 'react-router-dom'




type ShoppingCartProps = {
    isOpen: boolean
}
export function Kurv({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Kurv</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Stack gap={4}>
              {cartItems.map(item => (
                <Vare key={item.id} {...item} />
              ))}
            </Stack>
          </div>
          <div>
            <div className="ms-auto fw-bold fs-5">
              Total {" "}
              {format(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find(i => i.id === cartItem.id)
                  return total + (item?.price || 0) * cartItem.quantity
                }, 0)
              )}
            </div>
            <Link to="/betaling">
              <Button onClick={closeCart} variant="primary" className="w-100 mt-3">Næste</Button>
            </Link>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}