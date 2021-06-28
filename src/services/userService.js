import axios from "axios";

let login = payload => {
    const config = {
        method: 'POST',
        url: 'https://api.remotebootcamp.dev/api/users/login',
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {'Content-Type':'application/json'}
    }
    return axios(config)
}

let logout = () => {
    const config = {
        method: 'GET',
        url: 'https://api.remotebootcamp.dev/api/users/logout',
    }
    return axios(config)
}

let register = (payload) => {
    console.log(payload)
    const config = {
        method: 'Post',
        url: 'https://api.remotebootcamp.dev/api/users/register',
        data: payload,
        crossdomaim: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
    }
    return axios(config)
}

export { logout, login, register }
