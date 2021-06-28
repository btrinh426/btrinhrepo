import axios from "axios";

let addFriend = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let showFriends = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let updateFriend = (id, payload) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/friends/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let deleteFriend = (id) => {
    const config = {
        method: "DELETE",
        url: `https://api.remotebootcamp.dev/api/friends/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
    .then((response) => {
        console.log(response);
    })
};

let getFriendInfo = (id) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/" + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

let searchFriend = (pageIndex, pageSize, searchQuery) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchQuery}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}



export {addFriend, showFriends, updateFriend, deleteFriend, getFriendInfo, searchFriend}