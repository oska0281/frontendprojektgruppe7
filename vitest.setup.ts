declare global {
    interface Window {
      matchMedia: (query: string) => MediaQueryList;
    }
  }
  
  
  window.matchMedia = window.matchMedia || function (query: string) {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      media: query,
      onchange: null,
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    } as MediaQueryList;
  };
    
    import matchers from "@testing-library/jest-dom/matchers";
    import { cleanup } from "@testing-library/react";
    import { afterEach, expect } from "vitest";
    
    expect.extend(matchers);
    
    afterEach(cleanup);