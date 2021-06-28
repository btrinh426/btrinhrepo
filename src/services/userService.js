import axios from "axios";

const endPoint = "https://api.remotebootcamp.dev/api/users/"

const login = (payload) => {

    const config = {
        method: "POST",
        url: endPoint + "login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};


const register = (payload) => {

    const config = {
        method: "POST",
        url: endPoint + "register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const current = () => {

    const config = {
        method: "GET",
        url: endPoint + "current",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const byId = (userId) => { //question

    const config = {
        method: "GET",
        url: endPoint + userId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const logout = () => {

    const config = {
        method: "GET",
        url: endPoint + "logout",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};




export { login, register, current, byId, logout }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }