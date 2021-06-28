import axios from "axios";

let logIn = (load) => {

    var payload = {
        "email": load.email,
        "password": load.password,
        "tenantId": "U01KN1UFYCQ"
    }
    console.log(payload)

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


export default logIn