import {Button, Card} from "react-bootstrap";
import {formater} from "../utilities/formater";
import {useKurv} from "../kontekst/KurvKontekst";

type ProdukterProps ={
    id: string,
    navn: string,
    pris:number,
    billedeURL:string
}

export function Produkter({ id,navn,pris,billedeURL}:ProdukterProps){
    const { getVareAntal, increaseKurvAntal, decreaseKurvAntal, fjernFraKurv} = useKurv()
    const antal = getVareAntal(id)
    return (
    <Card className="h-100">
        <Card.Img variant="top" src = {billedeURL} height="200px" style={{objectFit:"cover"}} />

        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-4">{navn}</span>
                <span className="ms-4">{formater(pris)}</span>
            </Card.Title>
            <div className="mt-auto">
                {antal === 0 ? (
                    <Button className="w-100" onClick={() => increaseKurvAntal(id)}>+Tilføj til kurv</Button>
                ) : <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center"style={{gap: ".5rem"}}>
                       <Button onClick={() => decreaseKurvAntal(id)}>-</Button>
                        <div>
                            <span className="fs-3">{antal}</span> in cart
                            </div>
                       <Button onClick={() => increaseKurvAntal(id)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => fjernFraKurv(id)}>Fjern</Button>
                </div> }
            </div>
        </Card.Body>
    </Card>
    )
}