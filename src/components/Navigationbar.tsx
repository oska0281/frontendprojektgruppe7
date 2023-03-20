import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom";
import shoppingcart from 'src/assets/shoppingcart.svg'
import {useShoppingCart} from "../context/ShoppingCartContext";

export function Navigationbar() {
    const { openCart, cartQuantity} = useShoppingCart()
    return <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me.auto">
                <Nav.Link to="/" as={NavLink}
                >Home
                </Nav.Link>
                <Nav.Link to="/store" as={NavLink}
                >Store
                </Nav.Link>
                <Nav.Link to="/about" as={NavLink}
                >About
                </Nav.Link>
            </Nav>
            <Button onClick={openCart} style={{ width: "4rem", height:"3rem", position: "relative"}}>
                Cart

                {cartQuantity > 0 && (
                <div className="rounded-circle bg-danger d-flex justify-content-center
                 align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform:"translate(40%, 30%)"}}>{cartQuantity}</div>
                )}
            </Button>
        </Container>
    </Navbar>
}
