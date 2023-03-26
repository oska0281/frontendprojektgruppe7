import products from "../data/products.json"
import {Col, Row} from "react-bootstrap";
import {Produkter} from "../komponenter/Produkter";


export function StartSide() {
    return (
    <><h1>Butik</h1>
    <Row md={2} xs={1} lg={3} className="g-3">
        {products.map(product =>(
            <Col key ={product.id}><Produkter {...product} /></Col>
        ))}
    </Row>
    </>
  )
}