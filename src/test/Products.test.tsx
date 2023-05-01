import { render, fireEvent } from '@testing-library/react';
import { Products, Product } from '../components/Products';
import { CartProvider } from '../context/CartContext';
import { describe, expect, it } from 'vitest';

describe('Products component', () => {
  const testProduct: Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    currency: 'DKK',
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    imageUrl: 'https://example.com/image1.jpg',
  };

  it('renders product information correctly', () => {
    const { getByText } = render(
      <CartProvider>
        <Products {...testProduct} />
      </CartProvider>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('100.00')).toBeInTheDocument();
  });

  it('increases cart quantity on click', () => {
    const { getByText } = render(
      <CartProvider>
        <Products {...testProduct} />
      </CartProvider>
    );

    const addToCartButton = getByText('Tilføj til kurv');
    fireEvent.click(addToCartButton);

    expect(getByText('1 in cart')).toBeInTheDocument();
  });

  it('decreases cart quantity on click', () => {
    const { getByText } = render(
      <CartProvider>
        <Products {...testProduct} />
      </CartProvider>
    );

    const addToCartButton = getByText('Tilføj til kurv');
    fireEvent.click(addToCartButton);

    const decreaseButton = getByText('-');
    fireEvent.click(decreaseButton);

    expect(getByText('0 in cart')).toBeInTheDocument();
  });

  it('removes item from cart on click', () => {
    const { getByText, queryByText } = render(
      <CartProvider>
        <Products {...testProduct} />
      </CartProvider>
    );

    const addToCartButton = getByText('Tilføj til kurv');
    fireEvent.click(addToCartButton);

    const removeButton = getByText('Fjern');
    fireEvent.click(removeButton);

    expect(queryByText('1 in cart')).toBeNull();
  });
});
