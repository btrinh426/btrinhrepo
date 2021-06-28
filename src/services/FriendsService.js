import axios from "axios"

let addFriend = (payload) =>
{
    const config ={
    method : "POST",
    url : "https://api.remotebootcamp.dev/api/friends",
    data : payload,
    withCredentials : true,
    crossdomain : true,
    headers : {"Content-Type" : "application/json"}
    }

    return axios(config)
};

let getAllFriends = () => {

    const config = {
        method : "GET",
        url : "https://api.remotebootcamp.dev/api/friends",
        crossdomain : true,
        headers : {"Content-Type" : "application/json"} 
    };
    return axios(config)
};

export default {addFriend , getAllFriends}