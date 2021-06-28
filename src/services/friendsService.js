import axios from "axios";

const endPoint = "https://localhost:50001/api/friends/"

const add = (payload) => {

    const config = {
        method: "POST",
        url: endPoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getList = () => {

    const config = {
        method: "GET",
        url: endPoint + "paginate/?pageIndex=0&pageSize=5",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const updateFriend = (payload, friendId) => {

    const config = {
        method: "PUT",
        url: endPoint + friendId,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const deleteFriend = (friendId) => {

    const config = {
        method: "DELETE",
        url: endPoint + friendId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { add, getList, updateFriend, deleteFriend }