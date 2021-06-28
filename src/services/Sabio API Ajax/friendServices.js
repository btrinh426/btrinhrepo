import axios from "axios";

const get = (pgIndex, pgSize) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=" + pgIndex + "&pageSize=" + pgSize,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const add = (payload) => {
    var config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

const put = (payload, id) => {
    var config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => id);
};

const remove = (id) => {
    var config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => id)
}

export default { get, add, put, remove };