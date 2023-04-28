import { useKurv } from "../kontekst/KurvKontekst";
import "../styling/item.css";

type KurvVareProps = {
  id: string;
  navn: string;
  antal: number;
  pris: number;
  imageUrl?: string;
};

export function Vare({ id, navn, antal, pris, imageUrl }: KurvVareProps) {
  const { fjernFraKurv } = useKurv();

  return (
    <div className="item-row">
      <div className="item-img-con">
        <img src={imageUrl} alt={navn} />
        <span className="item-amount">{antal}</span>
      </div>
      <div className="item-details">
        <span className="item-name">{navn}</span>
        <span className="item-price">Stk. pris {pris} DKK </span>
        <span className="item-total">Total: {pris * antal} DKK</span>
      </div>
      <button className="item-btn-remove" onClick={() => fjernFraKurv(id)}>x</button>
    </div>
  );
               
}
