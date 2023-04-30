

interface values {
    email: string;
    password: string;
}

export function ValidationLogin(values:values){


let error ={
   email:"",
    password:""
}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Email skal udfyldes"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email matcher ikke"
    } else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "password skal udfyldes"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "password matcher ikke"
    } else {
        error.password = ""
    }

    return error
}

export default ValidationLogin;
