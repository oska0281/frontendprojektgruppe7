import {Button, Card} from "react-bootstrap";
import {formater} from "../utilities/formater";
import {useKurv} from "../kontekst/KurvKontekst";

interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
    imageUrl: string;
  }
  
  type ProdukterProps = Product;
  
  export function Produkter({
    id,
    name,
    price,
    imageUrl,
  }: ProdukterProps) {
  
    const { getVareAntal, increaseKurvAntal, decreaseKurvAntal, fjernFraKurv } =
      useKurv();
  
    const antal = getVareAntal(id);
  
    return (
      <div className="products-card">
        <div className="products-card-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>
  
        <div className="products-card-body">
          <div className="products-card-title">
            <span className="products-card-item-name">{name}</span>
            <span className="products-card-item-price">{formater(price)}</span>
          </div>
  
          <div className="products-card-interact">
            {antal === 0 ? (
              <button className="products-card-btn-add" onClick={() => increaseKurvAntal(id)}>
                Tilføj til kurv
              </button>
            ) : (
              <div className="products-card-div-edit">
                <div className="products-card-div-id">
                  <button className="products-card-btn-decrease" onClick={() => decreaseKurvAntal(id)}>-</button>
                  <div>
                    <span className="products-card-span-amount">{antal}</span> in cart
                  </div>
                  <button className="products-card-btn-increase" onClick={() => increaseKurvAntal(id)}>+</button>
                </div>
                <button
                  className="products-card-btn-remove"
                  onClick={() => fjernFraKurv(id)}>
                  Fjern
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }