import axios from "axios"

let addJob = (payload, onSuccess, onError) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/jobs",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}

export { addJob };