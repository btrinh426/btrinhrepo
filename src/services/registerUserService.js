import axios from "axios";

var registerUserService = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
};

let register = (payload) => {
    console.log(payload);
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let logIn = (payload) => {
    console.log("This is my login in", payload)
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getCurrent = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getUserId = (userId) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users" + "/" + userId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let logOut = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let addFriend = (payload) => {
    console.log("This is my new registered friend", payload)
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

let getFriends = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=25",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getFriendById = (friendId) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends" + "/" + friendId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let editById = (payload, id) => {
    console.log("I am updating my friend", id)
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends" + "/" + id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

let deleteFriends = (friendId) => {
    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends" + "/" + friendId,
        friendId: +friendId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

let getNumberFriends = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let searchByText = (pageIndex, pageSize, searchText) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchText}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


export { register, logIn, getCurrent, getUserId, logOut, addFriend, getFriends, getFriendById, editById, deleteFriends, getNumberFriends, searchByText };