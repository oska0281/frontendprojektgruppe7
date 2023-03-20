import products from "../data/products.json"
import {Col, Row} from "react-bootstrap";
import {Products} from "../components/Products";


export function Store() {
    return (
    <><h1>Store</h1>
    <Row md={2} xs={1} lg={3} className="g-3">
        {products.map(product =>(
            <Col key ={product.id}><Products {...product} /></Col>
        ))}
    </Row>
    </>
  )
}