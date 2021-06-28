import axios from "axios";

var userService = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
}

let logIn = payload => {

    const config ={
        method: "POST"
        , url: `${userService.endpoint}/login`
        , data: payload
        , withCredentials: true
        ,  crossdomain: true
        , headers: { "Content-Type" : "application/json" }
    };

    return axios(config);
};

let currentUser = () =>
{
    const config = {
        method: "GET"
        , url: `${userService.endpoint}/current`
        , crossdomain: true
        ,  headers: { "Content-Type" : "application/json" }
    };

    return axios(config);
};

let createNewUser = payload =>{
    const config = {
        method: "POST"
        , url: `${userService.endpoint}/register`
        , data: payload
        , crossdomain: true
        , headers: {"Content-Type" : "application/json"}
    };

    return axios(config)
};
let logOut = () =>{

    const config = {
        method: "GET"
        , url: `${userService.endpoint}/logout`
        , crossdomain: true
        , headers: {"Content-Type" : "application/json"}
    };

    return axios(config)
};

let userInfo = (id) => {

    const config = {
        method: "GET"
        , url: `${userService.endpoint}/${id}`
        , crossdomain: true
        , headers: {"Content-Type": "application/json"}
    };

    return axios(config);
}
export {logIn, currentUser, createNewUser, logOut, userInfo};