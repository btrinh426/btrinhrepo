import axios from "axios";

export const showFriends = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=50",
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export const deleteFriend = (payload) => {

    let friendId = payload.id;

    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends" + friendId,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
}

export default { showFriends, deleteFriend };