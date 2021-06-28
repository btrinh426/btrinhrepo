import axios from "axios";

const friendService = {
    post: "https://api.remotebootcamp.dev/api/friends",
    get1: "https://api.remotebootcamp.dev/api/friends/",
    getAll: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=6",
    delete: "https://api.remotebootcamp.dev/api/friends/",
    edit: "https://api.remotebootcamp.dev/api/friends/",
    search:
        "https://api.remotebootcamp.dev/api/friends/?pageIndex=0&pageSize=10&q=",
};

const addFriend = payload => {
    //console.log("Adding a New Pal");
    const config = {
        method: "POST",
        data: payload,
        url: friendService.post,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

const getFriendById = id => {
    //console.log("Grabbing buddy: ", id);
    const config = {
        method: "GET",
        url: friendService.get1 + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

const getAllFriends = () => {
    //console.log("Grabbing buddies ");
    const config = {
        method: "GET",
        url: friendService.getAll,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};
const deleteFriend = id => {
    console.log(`Sending ${id} to bit hell`);
    const config = {
        method: "DELETE",
        url: friendService.delete + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(() => id);
};

const editFriend = (payload, id) => {
    console.log(`Modifying ${id}`, payload);
    const config = {
        method: "PUT",
        data: payload,
        url: friendService.edit + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(() => config.data);
};
const searchFriends = query => {
    console.log(`Searching For ${query}`);
    const config = {
        method: "GET",
        url: friendService.search + query,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export {
    editFriend,
    searchFriends,
    deleteFriend,
    getAllFriends,
    addFriend,
    getFriendById,
};
