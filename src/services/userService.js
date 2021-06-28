import axios from "axios";
import { onGlobalSuccess, onGlobalError } from "./serviceHelper";
import debug from "sabio-debug";

var users = {
    endpoint: "https://api.remotebootcamp.dev/api/myusers",
    dotnetEndpoint: "http://localhost:50000/api/myusers"
}

const addUser = (payload) => {

    // var load = {
    //     "FirstName": "posttest",
    //     "LastName": "LastName",
    //     "Email": "an email",
    //     "Password": "a password",
    //     "PasswordConfirm": "password congirm",
    //     "AvatarUrl": "a long url prolly",
    //     "TenantId": "a tenant id for a compnay"
    // }


    const config = {
        method: "POST",
        url: users.dotnetEndpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

let logIn = (load) => {

    var payload = {
        "email": load.email,
        "password": load.password,
        "tenantId": "U01KN1UFYCQ"
    }


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

const showUsers = () => {
    const config = {
        method: "GET",
        url: users.dotnetEndpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteUser = (id) => {

    const config = {
        method: "DELETE",
        url: users.dotnetEndpoint + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => id).catch(onGlobalError);
}

export { addUser, logIn, showUsers, deleteUser };