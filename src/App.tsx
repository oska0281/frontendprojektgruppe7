
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import {Levering} from "./pages/Levering";
import {Butik} from "./pages/Butik";
import {Betaling} from "./pages/Betaling";
import {Navigationsbar} from "./komponenter/Navigationsbar"
import {KurvProvider} from "./kontekst/KurvKontekst";

function App(){
  return (
  <KurvProvider>
    <Navigationsbar />
    <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Butik />} />
        <Route path="/levering" element={<Levering  />} />
      <Route path="/betaling" element={<Betaling />} />
     </Routes>
   </Container>
  </KurvProvider>
)
}



export default App
