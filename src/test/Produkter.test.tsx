import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // Tilføj denne linje
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Products } from '../components/Products';
import { CartProvider } from '../context/CartContext';

describe('Produkter', () => {
  const defaultProps = {
    id: '1',
    navn: 'Test Product',
    pris: 100,
    billedeURL: 'https://example.com/test-image.jpg',
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
    fireEvent.click(addButton); // Brug fireEvent i stedet for userEvent
    expect(screen.getByText('1 in cart')).toBeInTheDocument();
  });
});

//        Virker ikke i øjeblikket, pga ændringer i import filer