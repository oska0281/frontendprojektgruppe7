import { Products } from "../components/Products";
import { useEffect, useState } from "react";
import "../styling/store.css";

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

export function Store() {
  const [produkter, setProdukter] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
    )
      .then((response) => response.json())
      .then((data: Product[]) => setProdukter(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="store-padding-top"></div>
      <div className="store-container">
        {produkter.map((produkt) => (
          <div key={produkt.id} className="store-item">
            <Products {...produkt} />
          </div>
        ))}
      </div>
    </>
  );
}
