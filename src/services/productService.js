import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/entities/products";

let add = (payload) => {
    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let getAll = () => {
    const config = {
        method: "GET",
        url: endpoint,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

export { add, getAll };