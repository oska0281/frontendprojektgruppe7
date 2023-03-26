
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import {Oplysninger} from "./pages/Oplysninger";
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
      <Route path="/oplysninger" element={<Oplysninger />} />
      <Route path="/betaling" element={<Betaling />} />
     </Routes>
   </Container>
  </KurvProvider>
)
}



export default App
