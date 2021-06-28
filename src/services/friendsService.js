import axios from "axios";

let addFriend = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let updateFriend = (id) => {
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getFriendById = (id) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config)
};

let getAllFriends = (pgIdx, pgSize) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pgIdx}&pageSize=${pgSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config)
};

let searchFriends = (pgIdx, pgSize, qFind) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pgIdx}&pageSize=${pgSize}&q=${qFind}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config)
};



export default { addFriend, updateFriend, getAllFriends, getFriendById, searchFriends }