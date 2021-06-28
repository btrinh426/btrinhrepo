import axios from "axios";

let logIn = (payload) => {

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


let register = (payload) => {

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


export { logIn, register }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }