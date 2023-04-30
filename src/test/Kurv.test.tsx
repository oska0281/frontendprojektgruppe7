import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cart } from '../components/Cart';
import { CartProvider } from '../context/CartContext';

describe('Kurv', () => {
  it('renders cart with closed state', () => {
    render(
      <CartProvider>
        <Cart isOpen={false} />
      </CartProvider>
    );

    const cartTitle = screen.queryByText('Kurv');
    expect(cartTitle).not.toBeInTheDocument();
  });

  it('renders cart with open state', () => {
    render(
      <CartProvider>
        <Cart isOpen={true} />
      </CartProvider>
    );

    const cartTitle = screen.getByText('Cart');
    expect(cartTitle).toBeVisible();
  });

  it('closes the cart when close button is clicked', () => {
    render(
      <CartProvider>
        <Cart isOpen={true} />
      </CartProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const cartTitle = screen.queryByText('Cart');
    expect(cartTitle).not.toBeInTheDocument();
  });
});

