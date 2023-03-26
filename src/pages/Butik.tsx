import produkter from "../data/produkter.json"
import {Col, Row} from "react-bootstrap";
import {Produkter} from "../komponenter/Produkter";


export function Butik() {
    return (
    <> <h1 style={{ paddingTop: '30px' }}></h1>
    <Row md={2} xs={1} lg={3} className="g-3">
        {produkter.map(produkt =>(
            <Col key ={produkt.id}><Produkter {...produkt} /></Col>
        ))}
    </Row>
    </>
  )
}