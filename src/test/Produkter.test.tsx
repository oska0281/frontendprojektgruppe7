import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Produkter } from '../komponenter/Produkter';
import { KurvProvider } from '../kontekst/KurvKontekst';

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
        <Produkter {...defaultProps} />
      </KurvProvider>,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('kr100.00')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test product/i })).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('adds product to cart', () => {
    render(
      <KurvProvider>
        <Produkter {...defaultProps} />
      </KurvProvider>,
    );

    const addButton = screen.getByText('+Tilføj til kurv');
    userEvent.click(addButton);
    expect(screen.getByText('1 in cart')).toBeInTheDocument();
  });
});


//        Virker ikke i øjeblikket, pga ændringer i import filer