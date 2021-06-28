import axios from 'axios';

let FriendsService = {};

FriendsService.getAllFriends = (pageIndex, pageSize) =>
{
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

FriendsService.getRecordById = (friendId) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends/${friendId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);

}

FriendsService.editRecordById = (friendId, payload) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/friends/${friendId}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

FriendsService.deleteUserById = (friendId) => {
    const config = {
        method: "DELETE",
        url: `https://api.remotebootcamp.dev/api/friends/${friendId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

FriendsService.addFriend = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

FriendsService.searchFriendsByName = (pageIndex,pageSize,query) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);

}

export default FriendsService;