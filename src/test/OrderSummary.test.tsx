import { render } from '@testing-library/react';
import { OrderSummary } from '../pages/OrderSummary';
import { describe, expect, it } from 'vitest';
import React from "react";
//*todo skal lige fixes
describe('OrderSummary', () => {
  const cartProducts = [    { id: '1', quantity: 2 },    { id: '2', quantity: 1 }  ];

  it('displays the correct product information', () => {
    const { getByText } = render(<OrderSummary/>);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('50.00 DKK')).toBeInTheDocument();
    expect(getByText('30.00 DKK')).toBeInTheDocument();
    expect(getByText('100.00 DKK')).toBeInTheDocument();
    expect(getByText('30.00 DKK')).toBeInTheDocument();
    expect(getByText('160.00 DKK')).toBeInTheDocument();
  });

  it('displays the correct total price', () => {
    const { getByText } = render(<OrderSummary/>);
    expect(getByText('Total før rabat:')).toBeInTheDocument();
    expect(getByText('Heraf moms:')).toBeInTheDocument();
    expect(getByText('Mængderabat:')).toBeInTheDocument();
    expect(getByText('Efter rabat:')).toBeInTheDocument();
    expect(getByText('160.00 DKK')).toBeInTheDocument();
    expect(getByText('40.00 DKK')).toBeInTheDocument();
    expect(getByText('0.00 DKK')).toBeInTheDocument();
    expect(getByText('200.00 DKK')).toBeInTheDocument();
  });

  it('navigates to the delivery page when "Forsæt til levering" button is clicked', () => {
    const { getByText } = render(<OrderSummary/>);
    const continueButton = getByText('Forsæt til levering');
    expect(continueButton).toBeInTheDocument();
    continueButton.click();
    expect(window.location.href).toEqual('/checkout');
  });
});