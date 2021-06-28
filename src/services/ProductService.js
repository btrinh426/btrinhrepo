import axios from "axios";

let exampleLogin = ()=>{
    var payload={
        "email": "George123@nomail.com",
        "password": "Pass!123",
        "tenantId": "2341"
    }

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let submitForm = (payload) =>{
    console.log(payload);
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: payload,
        crossDomain: true,
        headers: { "Content-Type": "application/json-patch+json" }
    }
    return axios(config);
}

export { submitForm, exampleLogin };