import axios from "axios";

const get = (payload) => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/techcompanies?pageIndex=0&pageSize=10",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { get }