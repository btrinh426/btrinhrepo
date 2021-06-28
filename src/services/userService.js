// import axios from "axios";


// const userService = {
//     endpoint: "https://api.remotebootcamp.dev/api/users"
// };

// userService.logIn = (payload) => {

//     const config = {
//         method: "POST",
//         url: userService.endpoint + "/login",
//         data: payload,
//         withCredentials: true,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config)
//         .then(function (data) {
//             console.log(data);
//         })
//         .catch(function (data) {
//             console.warn(data);
//         });
// };

// export default userService;


import axios from "axios";

const logIn = (payload) => {

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


// let register = (payload, onSuccess, onError) => {

//     const config = {
//         method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
//         url: "_AnOther_URL_GOES_HERE",
//         data: payload,
//         withCredentials: true,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config);
// };


export { logIn };