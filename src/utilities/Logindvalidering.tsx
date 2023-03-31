

interface values {
    email: string;
    kodeord: string;
}

export function Logindvalidering(values:values){


let error ={
   email:"",
    kodeord:""
}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const kodeord_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Email skal udfyldes"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email matcher ikke"
    } else {
        error.email = ""
    }

    if(values.kodeord === ""){
        error.kodeord = "Kodeord skal udfyldes"
    }
    else if(!kodeord_pattern.test(values.kodeord)){
        error.kodeord = "Kodeord matcher ikke"
    } else {
        error.kodeord = ""
    }

    return error
}

export default Logindvalidering;
