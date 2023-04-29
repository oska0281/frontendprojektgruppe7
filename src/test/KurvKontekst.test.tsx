import 'mock-local-storage';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from '../kontekst/KurvKontekst';
import React from 'react';


describe('KurvKontekst', () => {
  it('should increase cart quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.increaseKurvAntal('1');
    });

    expect(result.current.kurvAntal).toBe(1);
  });

  it('should decrease cart quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <KurvProvider>{children}</KurvProvider>;
    const { result } = renderHook(() => useKurv(), { wrapper });

    act(() => {
      result.current.increaseKurvAntal('1');
      result.current.increaseKurvAntal('1');
    });

    act(() => {
      result.current.decreaseKurvAntal('1');
    });

    expect(result.current.kurvAntal).toBe(2);
  });

  it('should remove item from cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <KurvProvider>{children}</KurvProvider>;
    const { result } = renderHook(() => useKurv(), { wrapper });

    act(() => {
        result.current.increaseKurvAntal('1');
        result.current.increaseKurvAntal('2');
        result.current.fjernFraKurv('1');
      });
      
      expect(result.current.kurvVarer).toEqual([{ id: '2', antal: 1 }]);
    });
    it('should not decrease cart quantity below zero', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <KurvProvider>{children}</KurvProvider>;
      const { result } = renderHook(() => useKurv(), { wrapper });
  
      act(() => {
        result.current.decreaseKurvAntal('1');
      });
  
      expect(result.current.kurvAntal).toBe(0);
    });
  
    it('should update cart total correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <KurvProvider>{children}</KurvProvider>;
      const { result } = renderHook(() => useKurv(), { wrapper });
  
      act(() => {
        result.current.increaseKurvAntal('1');
        result.current.increaseKurvAntal('2');
      });
  
      expect(result.current.kurvAntal).toBe(3);
    });
});

/*    Some of the test do not pass, and there is some trouble with the memory of the cart    */