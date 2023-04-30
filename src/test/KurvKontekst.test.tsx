import 'mock-local-storage';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';
import React from 'react';


describe('KurvKontekst', () => {
  it('should increase cart quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.increaseCartQuantity('1');
    });

    expect(result.current.cartQuantity).toBe(1);
  });

  it('should decrease cart quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.increaseCartQuantity('1');
      result.current.increaseCartQuantity('1');
    });

    act(() => {
      result.current.decreaseCartQuantity('1');
    });

    expect(result.current.cartQuantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
        result.current.increaseCartQuantity('1');
        result.current.increaseCartQuantity('2');
        result.current.removeFromCart('1');
      });
      
      expect(result.current.cartProducts).toEqual([{ id: '2', antal: 1 }]);
    });
   
    it('should update cart total correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
      const { result } = renderHook(() => useCart(), { wrapper });
  
      act(() => {
        result.current.increaseCartQuantity('1');
        result.current.increaseCartQuantity('2');
      });
  
      expect(result.current.cartQuantity).toBe(3);
    });
});
