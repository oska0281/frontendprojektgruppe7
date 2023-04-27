import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Levering } from "./pages/Levering";
import { Butik } from "./pages/Butik";
import { Betaling } from "./pages/Betaling";
import { Navigationsbar } from "./komponenter/Navigationsbar";
import { KurvProvider } from "./kontekst/KurvKontekst";
import Loading from './komponenter/Loading'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <KurvProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navigationsbar />
          <div className="app-con">
            <Routes>
              <Route path="/" element={<Butik />} />
              <Route path="/levering" element={<Levering />} />
              <Route path="/betaling" element={<Betaling />} />
            </Routes>
          </div>
        </>
      )}
    </KurvProvider>
  );
}

export default App;
