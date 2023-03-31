import React from "react";
import { Nav } from "react-bootstrap";
import {NavLink} from "react-router-dom";



export function Registrer(){
    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <form action="src">
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Navn</strong></label>
                        <input className="form-control rouded-0" type="text" placeholder="Indtast Navn"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input className="form-control rouded-0" type="email" placeholder="Indtast Email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Kodeord</strong></label>
                        <input className="form-control rouded-0" type="password" placeholder="Indtast Kodeord"/>
                    </div>
                    <button className="btn btn-success w-100">Opret Profil</button>
                    <p>Ved brug erklærer du dig enig i vores vilkår</p>
                    <Nav.Link to="/" as={NavLink}  className="btn btn-default border w-100">Log Ind</Nav.Link>
                </form>
            </div>
        </div>
    )
}
