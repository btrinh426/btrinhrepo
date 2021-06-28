import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/jobs";

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

let getAll = (index, size) => {
    const config = {
        method: "GET",
        //https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10
        url: endpoint + `?pageIndex=${index}&pageSize=${size}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};


export { add, getAll };
