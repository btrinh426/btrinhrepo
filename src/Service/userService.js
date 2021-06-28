import axios from "axios";




var payload = { email: "user@google.com", password: "password" };
let logIn = () => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let register = (state, formInfo) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: state, formInfo,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};


export default { logIn, register };






// export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }