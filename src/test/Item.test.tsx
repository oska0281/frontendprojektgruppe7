import { render, fireEvent } from '@testing-library/react';
import { Item } from '../components/Item';
import { CartProvider } from '../context/CartContext';
import { describe, expect, it } from 'vitest';

describe('Item component', () => {
  const testProduct = {
    id: '1',
    name: 'Product 1',
    price: 100,
    currency: 'DKK',
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    imageUrl: 'https://example.com/image1.jpg',
  };

  it('renders item information correctly', () => {
    const { getByText } = render(
      <CartProvider>
        <Item {...testProduct} quantity={1} />
      </CartProvider>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Stk. pris 100 DKK')).toBeInTheDocument();
    expect(getByText('Total: 100 DKK')).toBeInTheDocument();
  });

  it('removes item from cart on click', () => {
    const { getByText, queryByText } = render(
      <CartProvider>
        <Item {...testProduct} quantity={1} />
      </CartProvider>
    );

    const removeButton = getByText('x');
    fireEvent.click(removeButton);

    expect(queryByText('1 in cart')).toBeNull();
  });
});
