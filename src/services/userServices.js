import axios from "axios";

const userService = {
  endpoint: "https://api.remotebootcamp.dev/api/users"
};

const logInUser = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url: userService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(onSuccess).catch(onError)
};

let register = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(onSuccess).catch(onError)
};

// let register = (payload, onSuccess, onError) => {

//   const config = {
//     method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
//     url: "_AnOther_URL_GOES_HERE",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" }
//   };

//   return axios(config);
// };


export { logInUser, register }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }