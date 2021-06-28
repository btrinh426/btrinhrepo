import axios from "axios";

let friendsApi = 'https://api.remotebootcamp.dev/api/friends';

let add = (friend) => {
    const config = {
        method: 'POST',
        url: friendsApi,
        data: friend,
        crossdomain: true,
        withCredentials: true,
        headers: {'Content-Type':'application/json'}, 
    }
    return axios(config)
}

let list = () => {
    const config = {
        method: 'GET',
        url: `${friendsApi}?pageIndex=0&pageSize=10`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type':'application/json' }
    }

    return axios(config)
}

let remove = (id) => {
    const config = {
        method: 'DELETE',
        url: `${friendsApi}${id}`,
        crossdomain: true,
        withCredentials: true,
        headers:{ 'Content-Type': 'application/json' }
    }
    return axios(config)
}

export { add, list }