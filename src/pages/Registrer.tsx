import React, {useEffect, useState} from "react";
import { Nav } from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {Registervalidering} from "../utilities/Registrervalidering"
import axios from "axios"


interface values {
    navn:string;
  email: string;
  kodeord: string;
}
export function Registrer(){
  const [values, setValues] = useState<values>({
    navn:"",
    email: "",
    kodeord: ""
  });

  const [errors,setErrors] = useState({
    navn:"",
    email: "",
    kodeord: ""
  })

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(Registervalidering(values));
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues(prev=> ({...prev,[event.target.name]: event.target.value}))

  useEffect(() => {
    if(errors.navn === "" && errors.email === "" && errors.kodeord === ""){
      axios.post("http://localhost:5173/registrer",values)
        .then(res => {
          navigate("/login")
        })
        .catch(err => console.log(err));
    }
  }, [errors, navigate, values]);



    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Opret bruger</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Navn</strong></label>
                        <input onChange={handleInput} name="navn"className="form-control rouded-0" type="text" placeholder="Indtast Navn"/>
                         {/*{errors.navn &&<span className="text-danger">{errors.navn}</span>}*/}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input onChange={handleInput} name="navn"className="form-control rouded-0" type="email" placeholder="Indtast Email"/>
                    {/*{errors.email &&<span className="text-danger">{errors.email}</span>}*/}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Kodeord</strong></label>
                        <input onChange={handleInput} name="kodeord"className="form-control rouded-0" type="password" placeholder="Indtast Kodeord"/>
                   {/*{errors.kodeord &&<span className="text-danger">{errors.kodeord}</span>}*/}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Opret Profil</button>
                    <p>Ved brug erklærer du dig enig i vores vilkår</p>
                    <Nav.Link to="/login" as={NavLink}  className="btn btn-default border w-100">Log Ind</Nav.Link>
                </form>
            </div>
        </div>
    )
}
