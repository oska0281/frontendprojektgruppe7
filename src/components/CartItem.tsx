import {useShoppingCart} from "../context/ShoppingCartContext";
import products from "../data/products.json"
import {Button, Stack} from "react-bootstrap";
import {format} from "../utilities/format";



type CartItemProps ={
    id:string
    quantity:number
}


export function CartItem({id, quantity}: CartItemProps) {
    const {removeFromCart} = useShoppingCart()
    const item = products.find(i => i.id === id)
    if (item== null) return null

    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
            src={item.imageUrl}
            style={{width:"120px", height: "70px", objectFit:"cover"}}
            />
            <div className="me-auto">
                <div>
                    {item.name} <span className="text-muted" style={{fontSize:"0.60rem"}}>
                    x{quantity}
                </span>
                </div>
                <div className="text-muted" style={{fontSize:"0.70rem"}}>{format(item.price)}</div>
            </div>
            <div>{format(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )

}