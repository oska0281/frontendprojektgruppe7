import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cart } from '../components/Cart';
import { KurvProvider } from '../context/KurvKontekst';

describe('Kurv', () => {
  it('renders cart with closed state', () => {
    render(
      <KurvProvider>
        <Cart isOpen={false} />
      </KurvProvider>
    );

    const cartTitle = screen.queryByText('Kurv');
    expect(cartTitle).not.toBeInTheDocument();
  });

  it('renders cart with open state', () => {
    render(
      <KurvProvider>
        <Cart isOpen={true} />
      </KurvProvider>
    );

    const cartTitle = screen.getByText('Kurv');
    expect(cartTitle).toBeVisible();
  });

  it('closes the cart when close button is clicked', () => {
    render(
      <KurvProvider>
        <Cart isOpen={true} />
      </KurvProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const cartTitle = screen.queryByText('Kurv');
    expect(cartTitle).not.toBeInTheDocument();
  });
});

