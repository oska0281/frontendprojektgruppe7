import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cart } from '../komponenter/Kurv';
import { CartProvider } from '../kontekst/KurvKontekst';

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

    const cartTitle = screen.getByText('Kurv');
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

    const cartTitle = screen.queryByText('Kurv');
    expect(cartTitle).not.toBeInTheDocument();
  });
});


/* Some problems with the second and third test cases, everything used to work but since editing the components and creating separate CSS 
files the test file has not been it self, we will have to fix it */ 
