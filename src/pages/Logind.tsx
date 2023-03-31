import React from "react";
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";



export function Logind(){
    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <form action="src">
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input className="form-control rouded-0" type="email" placeholder="Indtast Email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Kodeord</strong></label>
                        <input className="form-control rouded-0" type="password" placeholder="Indtast Kodeord"/>
                    </div>
                    <button className="btn btn-success w-100">Log Ind</button>
                    <p>Ved brug erklærer du dig enig i vores vilkår</p>
                    <Nav.Link to="/registrer" as={NavLink}  className="btn btn-default border w-100">Opret Bruger</Nav.Link>
                </form>
            </div>
        </div>
    )
}
