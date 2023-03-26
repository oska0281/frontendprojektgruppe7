import {useKurv} from "../kontekst/KurvKontekst";
import produkter from "../data/produkter.json"
import {Button, Stack} from "react-bootstrap";
import {formater} from "../utilities/formater";



type CartItemProps ={
    id:string
    antal:number
}


export function Vare({id, antal}: CartItemProps) {
    const {fjernFraKurv} = useKurv()
    const item = produkter.find(i => i.id === id)
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
                    x{antal}
                </span>
                </div>
                <div className="text-muted" style={{fontSize:"0.70rem"}}>{formater(item.pris)}</div>
            </div>
            <div>{formater(item.pris * antal)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => fjernFraKurv(item.id)}>&times;</Button>
        </Stack>
    )

}