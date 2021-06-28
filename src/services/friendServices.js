import axios from "axios";

let  userEndpoint = "https://api.remotebootcamp.dev/api/";

const addFriend = (friend) => {
    const config = {
        method: "POST",
        url: `${userEndpoint}friends`,
        data: friend,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);    
}

const getFriend = (id) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}friends/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);   
}

const getFriends = (idx, pageSize) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}friends?pageIndex=${idx}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}

const updateFriend = (friend) => {
    const config = {
        method: "PUT",
        url: `${userEndpoint}friends/${friend.id}`,
        data: friend,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);    
}

const deleteFriend = (id) => {
    const config = {
        method: "DELETE",
        url: `${userEndpoint}friends/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

// "https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=2&q=road"
const searchFriends = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);  
}

export {addFriend, getFriend, getFriends, updateFriend, deleteFriend, searchFriends}