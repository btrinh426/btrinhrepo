import axios from "axios";

const add = (payload) => {
    console.log("uploading file...");

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/files",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export {add};