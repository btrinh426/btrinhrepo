import axios from "axios";

const friendsService = {
    endpoint: "https://api.remotebootcamp.dev/api/friends"
};

export function getAllFriends(pageIndex, pageSize){
    console.log("getAllFriends is executing")
    const config = {
        method: "GET",
        url: `${friendsService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json"} 
    }

    return axios(config)
};

export function deleteById(friendId){
    console.log("deletById is executing")
    const config = {
        method: "DELETE",
        url: `${friendsService.endpoint}/${friendId}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };

    return axios(config).then(() => {
        return {
            friendId : friendId
        }
    })
};

export function searchFriends(pageIndex, pageSize, title){
    console.log("searchFriends is executing")
    const config = {
        method: "GET",
        url: `${friendsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${title}`,
        crossdomain: true,
        header: {"Content-Type": "application/json"}
    };

    return axios(config)
};

export function getFriendById(friendId) {
    console.log("getFriendById executing")
    const config = {
        method: "GET",
        url: `${friendsService.endpoint}/${friendId}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }

    return axios(config)
};

export function editFriendById(friendId, formData){
    console.log("editFriendById executing")
    const config = {
        method: "PUT",
        url: `${friendsService.endpoint}/${friendId}`,
        data: formData,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    };

    return axios(config).then(() => {

        return {
            friendId: friendId,
            formData: formData
        }
    })
};

export function addFriend(formData){
    console.log("addFriend is executing")
    const config = {
        method: "POST",
        url: `${friendsService.endpoint}`,
        data: formData,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    };

    return axios(config)
};