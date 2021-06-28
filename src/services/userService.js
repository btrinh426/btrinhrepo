import axios from "axios";



let logIn = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let register = (payload) => {
    // let payload = {
    //     "firstName": "George",
    //     "lastName": "Cecil",
    //     "email": "George123@nomail.com",
    //     "password": "Pass!123",
    //     "passwordConfirm": "Pass!123",
    //     "avatarUrl": "https://miro.medium.com/max/500/1*xDIevNE7HEMiJQVTYg0qDQ.png",
    //     "tenantId": "2341"
    // }

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getCurrent = () => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


export { logIn, register, getCurrent };