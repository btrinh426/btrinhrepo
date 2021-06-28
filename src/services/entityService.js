import axios from "axios";

let add = payload => {
    const config = {
        method: 'POST',
        url: 'https://api.remotebootcamp.dev/api/entities/schools',
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {'Content-Type':'application/json'}
    }
    return axios(config)
}

export { add }