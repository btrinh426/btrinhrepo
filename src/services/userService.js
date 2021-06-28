import axios from "axios";

const endpoint = "https://api.remotebootcamp.dev/api/entities/Phones"

const submit = (payload) => {

    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const getPhones = (payload) => {

    const config = {
        method: "GET",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

export { submit, getPhones };