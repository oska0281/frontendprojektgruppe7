import {Button, Card} from "react-bootstrap";
import {format} from "../utilities/format";
import {useShoppingCart} from "../kontekst/KurvKontekst";

type ProductsProps ={
    id: string,
    navn: string,
    pris:number,
    billedeURL:string
}

export function Produkter({ id,navn,pris,billedeURL}:ProductsProps){
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
    <Card className="h-100">
        <Card.Img variant="top" src = {billedeURL} height="200px" style={{objectFit:"cover"}} />

        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-4">{navn}</span>
                <span className="ms-4">{format(pris)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+Tilføj til kurv</Button>
                ) : <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center"style={{gap: ".5rem"}}>
                       <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3">{quantity}</span> in cart
                            </div>
                       <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(id)}>Fjern</Button>
                </div> }
            </div>
        </Card.Body>
    </Card>
    )
}