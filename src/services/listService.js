import axios from "axios";

export const showFriends = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=50",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export default showFriends;