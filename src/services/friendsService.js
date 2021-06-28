import axios from "axios";

const buildFriend = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then();
};


const deleteFriend = (id) => {

    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => id)
}

const updateFriend = (payload) => {

    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/" + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,

        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
}

export { buildFriend, deleteFriend, updateFriend }

