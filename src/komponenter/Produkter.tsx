import {formater} from "../utilities/formater";
import {useCart} from "../kontekst/KurvKontekst";
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

type ProductsProps = Product;

export function Produkter({
    id,
    name,
    price,
    imageUrl,
    rebateQuantity,
    rebatePercent
}: ProductsProps) {

    const { getProductQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
        useCart();

    const quantity = getProductQuantity(id);
    const discountedPrice = quantity >= rebateQuantity ? price * (1 - rebatePercent / 100) : price;

    return (
        <div className="products-card">
            <div className="products-card-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>

            <div className="products-card-body">
                <div className="products-card-title">
                    <span className="products-card-item-name">{name}</span>
                    <span className="products-card-item-price">{formater(discountedPrice)}</span>
                </div>

                {quantity > 0 && rebatePercent > 0 && (
                    <div className="products-card-bulk-discount" style={{ textAlign: 'center', marginTop: '10px' }}>
                        {quantity < rebateQuantity ? (
                            <span>
                                Køb {rebateQuantity - quantity} mere for at få {rebatePercent}% mængderabat
                            </span>
                        ) : (
                            <span>
                                Du har opnået {rebatePercent}% mængderabat!
                            </span>
                        )}
                    </div>
                )}

                <div className="products-card-interact">
                    {quantity === 0 ? (
                        <button className="products-card-btn-add" onClick={() => increaseCartQuantity(id)}>
                            Tilføj til kurv
                        </button>
                    ) : (
                        <div className="products-card-div-edit">
                            <div className="products-card-div-id">
                                <button className="products-card-btn-decrease" onClick={() => decreaseCartQuantity(id)}>-</button>
                                <div>
                                    <span className="products-card-span-amount">{quantity}</span> in cart
                                </div>
                                <button className="products-card-btn-increase" onClick={() => increaseCartQuantity(id)}>+</button>
                            </div>
                            <button
                                className="products-card-btn-remove"
                                onClick={() => removeFromCart(id)}>
                                Fjern
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}