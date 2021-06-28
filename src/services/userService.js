import axios from "axios";

const userService = {};

userService.registerUser = (payload) =>
{
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

userService.loginUser = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

userService.getCurrentUser =()=>
{
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

userService.getUserInfoById = (userId) =>
{
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/users/${userId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

userService.userLogout = () =>
{
const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
};

return axios(config);
}

export default userService;