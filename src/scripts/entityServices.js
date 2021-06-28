import axios from "axios";

const entityAdd = (payload, entityName) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/"+entityName,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export default {entityAdd};