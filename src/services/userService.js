import axios from "axios";

let createWidget = (payload, onSuccess, onError) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/sports",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};

export { createWidget }