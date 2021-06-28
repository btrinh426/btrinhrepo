import axios from "axios";

const get = (index, size) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs?pageIndex="+index+"&pageSize="+size,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const search = (index, size, query) => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs/search?pageIndex="+index+"&pageSize="+size+"&searchTerm="+query,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default {get, search};