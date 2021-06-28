import axios from 'axios';

const endpoint = "https://api.remotebootcamp.dev/api/friends"

const getFriends = () => {
    const config = {
        method : "GET",
        url: endpoint+"?pageIndex=0&pageSize=10",
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getFriendsPaginate = (page, size) => {
    const config = {
        method : "GET",
        url: `${endpoint}?pageIndex=${page}&pageSize=${size}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};
//this is a test function
const getFriendsPaginateSearch = (page, size, searchItem) => {
    const config = {
        method : "GET",
        url: `${endpoint}?pageIndex=${page}&pageSize=${size}&q=${searchItem}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const addFriend = (payload) => {
    const config = {
        method : "POST",
        url: endpoint,
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const searchFriends = (searchItem) => {
    const config = {
        method: "GET",
        url: `${endpoint}/search?pageIndex=0&pageSize=10&q=${searchItem}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const deleteFriend = (anIdToDelete) => {
    const config = {
        method: "DELETE",
        url : `${endpoint}/${anIdToDelete}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config)
    .then(() => anIdToDelete)
    
};

const editFriend = (id, payload) => {
    const config = {
        method: "PUT",
        url: `${endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getFriendById = (id) => {
    const config = {
        method: "GET",
        url: endpoint+id,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
}; 

export {
    getFriends,
    getFriendsPaginate,
    getFriendsPaginateSearch,
    addFriend,
    searchFriends,
    deleteFriend,
    editFriend,
    getFriendById
}