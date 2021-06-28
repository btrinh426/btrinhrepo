import axios from "axios";

var list = { dotnetEndpoint: "http://localhost:50000/api/friends" }

export const showFriends = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=100",
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export default showFriends