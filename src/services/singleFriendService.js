import axios from "axios";

let deleteFriend = (payload) => {
    console.log(payload)


    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/" + payload,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
}

export default deleteFriend;