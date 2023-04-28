import {formater} from "../utilities/formater";
import {useKurv} from "../kontekst/KurvKontekst";
import '../styling/products.css';

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
    rebateQuantity,
    rebatePercent
}: ProdukterProps) {

    const { getVareAntal, increaseKurvAntal, decreaseKurvAntal, fjernFraKurv } =
        useKurv();

    const antal = getVareAntal(id);
    const discountedPrice = antal >= rebateQuantity ? price * (1 - rebatePercent / 100) : price;

    return (
        <div className="products-card">
            <div className="products-card-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>

            <div className="products-card-body">
                <div className="products-card-title">
                    <span className="products-card-item-name">{name}</span>
                    <span className="products-card-item-price">{formater(discountedPrice)}</span>
                </div>

                {antal > 0 && rebatePercent > 0 && (
                    <div className="products-card-bulk-discount" style={{ textAlign: 'center', marginTop: '10px' }}>
                        {antal < rebateQuantity ? (
                            <span>
                                Køb {rebateQuantity - antal} mere for at få {rebatePercent}% mængderabat
                            </span>
                        ) : (
                            <span>
                                Du har opnået {rebatePercent}% mængderabat!
                            </span>
                        )}
                    </div>
                )}

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