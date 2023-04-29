import React, { useState, useEffect } from 'react';
import { KurvProvider } from "./kontekst/KurvKontekst";
import { Navigationsbar } from "./komponenter/Navigationsbar";
import { Levering } from "./pages/Levering";
import { Butik } from "./pages/Butik";
import { Betaling } from "./pages/Betaling";
import Loading from './komponenter/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopstate = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/levering':
        return <Levering />;
      case '/betaling':
        return <Betaling />;
      default:
        return <Butik />;
    }
  };

  return (
    <KurvProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navigationsbar onNavClick={setPath} />
          <div className="app-con">
            {renderPage()}
          </div>
        </>
      )}
    </KurvProvider>
  );
}

export default App;
