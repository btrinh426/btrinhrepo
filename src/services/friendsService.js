import axios from "axios";

var friends = {
    endpoint: "https://api.remotebootcamp.dev/api/friends"
}
const buildFriend = (payload) => {

    const config = {
        method: "POST",
        url: friends.endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then();
};


const deleteFriend = (id) => {

    const config = {
        method: "DELETE",
        url: friends.endpoint + "/" + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => id)
}

const updateFriend = (payload) => {

    const config = {
        method: "PUT",
        url: friends.endpoint + "/" + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,

        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
}



const searchFriend = (payload) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=100&q=" + payload,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};



export { buildFriend, deleteFriend, updateFriend, searchFriend }

