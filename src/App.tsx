
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import {Oplysninger} from "./pages/Oplysninger";
import {StartSide} from "./pages/StartSide";
import {Betaling} from "./pages/Betaling";
import {Navigationsbar} from "./komponenter/Navigationsbar"
import {ShoppingCartProvider} from "./kontekst/KurvKontekst";
function App(){
  return (
  <ShoppingCartProvider>
    <Navigationsbar />
    <Container className="mb-4">
    <Routes>
      <Route path="/" element={<StartSide />} />
      <Route path="/oplysninger" element={<Oplysninger />} />
      <Route path="/betaling" element={<Betaling />} />
     </Routes>
   </Container>
  </ShoppingCartProvider>
)
}



export default App
