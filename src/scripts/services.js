import axios from "axios";

const register = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const login = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const userGetCurrent = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const userLogout = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const friendsGet = (pgIndex, pgSize) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex="+pgIndex+"&pageSize="+pgSize,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const friendAdd = (payload) => {
    var config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const friendPut = (payload,id) => {
    var config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/"+id,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const friendDelete = (id) => {
    var config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/"+id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const jobsGet = (index, size) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs?pageIndex="+index+"&pageSize="+size,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const jobsSearch = (index, size, query) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs/search?pageIndex="+index+"&pageSize="+size+"&searchTerm="+query,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default {login, register, userGetCurrent, userLogout, friendsGet, friendAdd, friendPut, friendDelete, jobsGet, jobsSearch};