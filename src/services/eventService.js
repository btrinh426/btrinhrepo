import axios from "axios";

const eventEndpoint = "https://api.remotebootcamp.dev/api/events";

const getAll = (pageIndex, pageSize) => {
    console.log("retrieving events...");

    const config = {
        method: "GET",
        url: eventEndpoint + "/feed?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getMain = () => {
    console.log("retrieving main event...");

    const config = {
        method: "GET",
        url: eventEndpoint + "/feeds",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export {getAll, getMain};