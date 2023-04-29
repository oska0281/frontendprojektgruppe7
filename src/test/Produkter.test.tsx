import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Products } from '../komponenter/Products';
import { CartProvider } from '../kontekst/CartContext';

describe('Produkter', () => {
  const defaultProps = {
    id: '1',
    name: 'Test Product',
    price: 100,
    imageURL: 'https://example.com/test-image.jpg',
  };

  test('renders product correctly', () => {
    render(
      <CartProvider>
        <Products {...defaultProps} />
      </CartProvider>,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('kr100.00')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test product/i })).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('adds product to cart', () => {
    render(
      <CartProvider>
        <Products {...defaultProps} />
      </CartProvider>,
    );

    const addButton = screen.getByText('+Tilføj til kurv');
    userEvent.click(addButton);
    expect(screen.getByText('1 in cart')).toBeInTheDocument();
  });
});


//        Virker ikke i øjeblikket, pga ændringer i import filer