import {Button, Offcanvas, Stack} from "react-bootstrap";
import {useKurv} from "../kontekst/KurvKontekst";
import produkter from "../data/produkter.json"
import {Vare} from "./Vare";
import {formater} from "../utilities/formater";
import { Link } from 'react-router-dom'




type KurvProps = {
    erAaben: boolean
}
export function Kurv({ erAaben }: KurvProps) {
  const { lukKurv, kurvVarer } = useKurv()

  return (
    <Offcanvas show={erAaben} onHide={lukKurv} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Kurv</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Stack gap={4}>
              {kurvVarer.map(item => (
                <Vare key={item.id} {...item} />
              ))}
            </Stack>
          </div>
          <div>
            <div className="ms-auto fw-bold fs-5">
              Total {" "}
              {formater(
                kurvVarer.reduce((total, kurvVare) => {
                  const item = produkter.find(i => i.id === kurvVare.id)
                  return total + (item?.pris || 0) * kurvVare.antal
                }, 0)
              )}
            </div>
            <Link to="/levering">
              <Button onClick={lukKurv} variant="primary" className="w-100 mt-3">Næste</Button>
            </Link>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}