import axios from "axios";

const jobEndpoint = "https://api.remotebootcamp.dev/api/jobs"

const getPage = (pageIndex, pageSize) => {
    console.log("retrieving jobs...");

    const config = {
        method: "GET",
        url: jobEndpoint + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const add = payload => {
    console.log("adding job listing...");

    const config = {
        method: "POST",
        url: jobEndpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const remove = (jobId) => {
    console.log("deleting job...");

    const config = {
        method: "PUT",
        url: jobEndpoint + "/" + jobId + "/2",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
        .then( ()=> jobId)
       
};

const search = (pageIndex, pageSize, query) => {
    console.log("searching jobs...");

    const config = {
        method: "GET",
        url: jobEndpoint + "/search?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&searchTerm=" + query,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const update = (jobId, payload) => {
    console.log("updating job...");

    const config = {
        method: "PUT",
        url: jobEndpoint + "/" + jobId,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export {getPage, add, remove, search, update};