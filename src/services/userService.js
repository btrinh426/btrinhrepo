import axios from "axios";

let userRegister = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let userLogin = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let userLogOut = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
};

let getUserById = (id) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
};

let currentUser = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { userLogin, userRegister, userLogOut, getUserById, currentUser };

