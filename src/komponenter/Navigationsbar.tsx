import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom";
import shoppingcart from 'src/assets/shoppingcart.svg'
import {useShoppingCart} from "../kontekst/KurvKontekst";

export function Navigationsbar() {
    const { openCart, cartQuantity} = useShoppingCart()
    return <Navbar sticky="top" className="bg-white shadow-sm mb-3 custom-nav" style={{ height: "5rem" }}>
        <Container>
            <Nav className="me.auto">
                <Nav.Link to="/" as={NavLink} style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
                Butik
                </Nav.Link>
            </Nav>
            <Button onClick={openCart} style={{ width: "4rem", height:"3rem", position: "relative"}}>
                Kurv
                {cartQuantity > 0 && (
                <div className="rounded-circle bg-danger d-flex justify-content-center
                 align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform:"translate(40%, 30%)"}}>{cartQuantity}</div>
                )}
            </Button>
        </Container>
    </Navbar>
}
