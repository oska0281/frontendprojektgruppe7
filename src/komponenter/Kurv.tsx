import {Offcanvas, Stack} from "react-bootstrap";
import {useShoppingCart} from "../kontekst/KurvKontekst";
import products from "../data/products.json"
import {Vare} from "./Vare";
import {format} from "../utilities/format";




type ShoppingCartProps = {
    isOpen: boolean
}
export function Kurv({isOpen}:ShoppingCartProps){

    const { closeCart, cartItems } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={4}>
                    {cartItems.map(item => (
                        <Vare key={item.id}{...item}/>
                            ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {" "}
                        {format(
                            cartItems.reduce((total, cartItem) => {
                                const item = products.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            },0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>
    )
}