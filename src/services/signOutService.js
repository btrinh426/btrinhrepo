import axios from "axios";

const signOutUser = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config); 
};

export default signOutUser;