import axios from "axios";

var friendsService = {
    endpoint: "https://api.remotebootcamp.dev/api/friends/",
}

friendsService.newFriend = (payload) => {
    const config = {
        method: "POST",
        url: friendsService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

friendsService.allFriends = () => {
    const config = {
        method: "GET",
        url: friendsService.endpoint + "?pageIndex=0&pageSize=100",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

friendsService.delete = (id) => {
    const config = {
        method: "DELETE",
        url: friendsService.endpoint + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

export default friendsService;