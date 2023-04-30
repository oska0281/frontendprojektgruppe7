import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Products } from '../components/Products';
import { KurvProvider } from '../context/KurvKontekst';

describe('Produkter', () => {
  const defaultProps = {
    id: '1',
    navn: 'Test Product',
    pris: 100,
    billedeURL: 'https://example.com/test-image.jpg',
  };

  test('renders product correctly', () => {
    render(
      <KurvProvider>
        <Products {...defaultProps} />
      </KurvProvider>,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('kr100.00')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test product/i })).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('adds product to cart', () => {
    render(
      <KurvProvider>
        <Products {...defaultProps} />
      </KurvProvider>,
    );

    const addButton = screen.getByText('+Tilføj til kurv');
    userEvent.click(addButton);
    expect(screen.getByText('1 in cart')).toBeInTheDocument();
  });
});


//        Virker ikke i øjeblikket, pga ændringer i import filer