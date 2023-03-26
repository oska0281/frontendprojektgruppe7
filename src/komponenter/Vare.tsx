import {useShoppingCart} from "../kontekst/KurvKontekst";
import products from "../data/products.json"
import {Button, Stack} from "react-bootstrap";
import {format} from "../utilities/format";



type CartItemProps ={
    id:string
    quantity:number
}


export function Vare({id, quantity}: CartItemProps) {
    const {removeFromCart} = useShoppingCart()
    const item = products.find(i => i.id === id)
    if (item== null) return null

    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
            src={item.billedeURL}
            style={{width:"120px", height: "70px", objectFit:"cover"}}
            />
            <div className="me-auto">
                <div>
                    {item.navn} <span className="text-muted" style={{fontSize:"0.60rem"}}>
                    x{quantity}
                </span>
                </div>
                <div className="text-muted" style={{fontSize:"0.70rem"}}>{format(item.pris)}</div>
            </div>
            <div>{format(item.pris * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )

}