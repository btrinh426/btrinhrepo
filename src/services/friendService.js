import axios from "axios";

const friendEndpoint = "https://api.remotebootcamp.dev/api/friends";

const add = (payload) => {
    console.log("creating friend...");

    const config = {
        method: "POST",
        url: friendEndpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getAll = () => {
    console.log("retrieving friends...");

    const config = {
        method: "GET",
        url: friendEndpoint + "?pageIndex=0&pageSize=10",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getById = (friendId) => {
    console.log("getting friend...");

    const config = {
        method: "GET",
        url: friendEndpoint + "/" + friendId,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const search = (query) => {
    console.log("searching friends...");

    const config = {
        method: "GET",
        url: friendEndpoint + "/search?pageIndex=0&pageSize=10&q=" + query,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const remove = (friendId) => {
    console.log("deleting friend...");

    const config = {
        method: "DELETE",
        url: friendEndpoint + "/" + friendId,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
        .then(function () {
            return friendId;
        })
        .catch(function (response) {
            console.warn(response)
        });
};

const update = (friendId, payload) => {
    console.log("updating friend...");

    const config = {
        method: "PUT",
        url: friendEndpoint + "/" + friendId,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export {add, getAll, getById, search, remove, update};