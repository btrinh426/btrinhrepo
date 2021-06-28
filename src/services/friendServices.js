import axios from "axios";

let friendServices = {
    endpoint: "https://localhost:50001/api/friends"
};

friendServices.addFriend = payload => {
    const config ={
        method: "POST",
        url: friendServices.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

friendServices.showFriends = () => {
    const config ={
        method: "GET",
        url: friendServices.endpoint + "?pageIndex=0&pageSize=10",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

friendServices.updateFriend = id => {
    const config ={
        method: "PUT",
        url: friendServices.endpoint + "/" + id,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

friendServices.deleteFriend = id => {
    const config ={
        method: "DELETE",
        url: friendServices.endpoint + "/" + id,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

friendServices.searchFriends = searchTerm => {
    const config ={
        method: "GET",
        url: friendServices.endpoint + "/search?pageIndex=0&pageSize=10&q=" + searchTerm,
        data: searchTerm,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default friendServices