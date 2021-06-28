import axios from "axios";

let userEndpoint = "https://api.remotebootcamp.dev/api/techcompanies";

// "https://api.remotebootcamp.dev/api/techcompanies?pageIndex=0&pageSize=20"
const getTechCompanies = (idx, pageSize) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}?pageIndex=${idx}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}

const getTechCompany = (id) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);    
}

const updateCompany = (payload) => {
    const config = {
        method: "PUT",
        url: `${userEndpoint}/${payload.id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}

const addCompany = (payload) => {
    const config = {
        method: "POST",
        url: `${userEndpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}


export { getTechCompanies, getTechCompany, updateCompany, addCompany };