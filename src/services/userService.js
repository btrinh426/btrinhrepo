import axios from "axios";

var userService = {
    endpoint: "https://api.remotebootcamp.dev/api/users/",
}

userService.login = (payload) => {
    const config = {
        method: "POST",
        url: userService.endpoint + "login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)

}

userService.register = (payload) => {
    const config = {
        method: "POST",
        url: userService.endpoint + "register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

userService.logout = () => {
    const config = {
        method: "GET",
        url: userService.endpoint + "logout",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)

}

userService.current = () => {
    const config = {
        method: "GET",
        url: userService.endpoint + "current",
        crossdomain: true
    };
    return axios(config)
}


export default userService;






