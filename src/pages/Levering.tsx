import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

interface LeveringProps {
  navn: string;
  email: string;
  telefonnummer: number;
  adresse: string;
  postnummer:number;
  by:string;
  land:string;
}

export function Levering(props: LeveringProps) {
  const { navn,email,telefonnummer,adresse,postnummer,by,land } = props;

  return (

    <form style={{padding:"10px"}}>
        <h1 style={{padding:"20px"}}>Levering</h1>
      <div style={{marginBottom:"20px"}}>
        <label>Navn:</label>
        <input type="text" value={navn} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Email:</label>
        <input type="text"  value={email} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Telefonnummer:</label>
        <input type="text" value={telefonnummer} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Adresse:</label>
        <input type="text" value={adresse} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Postnummer:</label>
        <input type="text" value={postnummer} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>By:</label>
        <input type="text" value={by} />
      </div>
      <div style={{marginBottom:"20px"}}>
        <label>Land:</label>
        <input type="text" value={land} />
      </div>
        <Link to="/betaling">
              <Button variant="primary" style={{width:"300px"}}>Til Betaling</Button>
            </Link>
    </form>
  );
}