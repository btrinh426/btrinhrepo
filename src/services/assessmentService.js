import axios from "axios";

const entityService = {
    post: "https://api.remotebootcamp.dev/api/entities/products",
};

const createEntity = payload => {
    var config = {
        method: "POST",
        url: entityService.post,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    //console.log(config);
    return axios(config).then(res => res.data.item);
};

export { createEntity };
