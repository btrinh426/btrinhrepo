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

let updateFriend = (id) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/friends/${id}`,
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

    return axios(config);
};



export {addFriend, showFriends, updateFriend, deleteFriend}