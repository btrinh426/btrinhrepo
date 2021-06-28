import axios from "axios"


const endpoint = "https://api.remotebootcamp.dev/api/techcompanies"

const create = (payload) => {

    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getList = () => {

    const config = {
        method: "GET",
        url: endpoint + "?pageIndex=0&pageSize=10",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const update = (payload, comId) => {

    const config = {
        method: "PUT",
        url: endpoint + "/" + comId,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { create, getList, update }