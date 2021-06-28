import axios from "axios";

const friendService = {
    post: "https://localhost:50001/api/friends/",
    get1: "https://localhost:50001/api/friends/",
    getAll: "https://localhost:50001/api/friends/paginate?pageIndex=",
    delete: "https://localhost:50001/api/friends/",
    edit: "https://localhost:50001/api/friends/",
    search: "https://localhost:50001/api/friends/?pageIndex=0&pageSize=10&q=", // FIX THIS AS NECCESSARY
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

const pagedFriends = (index, size) => {
    //https://localhost:50001/api/friends/paginate?pageIndex=
    const config = {
        method: "GET",
        url: `${friendService.getAll}${index}&pageSize=${size}`,
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
    pagedFriends,
    addFriend,
    getFriendById,
};
