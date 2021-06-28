// import axios from "axios";
// axios.defaults.withCredentials = true;
// // Add a request interceptor
// axios.interceptors.request.use(function(config) {
//   config.withCredentials = true;
//   return config;
// });

// /**
//  * Will unpack the response body from reponse object
//  * @param {*} response
//  *
//  */
// const onGlobalSuccess = response => {
//   /// Should not use if you need access to anything other than the data
//   return response.data;
// };

// const onGlobalError = err => {
//   return Promise.reject(err);
// };

// const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;
// const API_NODE_HOST_PREFIX = process.env.REACT_APP_API_NODE_HOST_PREFIX;

// console.log("API_HOST_PREFIX", API_HOST_PREFIX);

// export {
//   onGlobalError,
//   onGlobalSuccess,
//   API_HOST_PREFIX,
//   API_NODE_HOST_PREFIX
// };

import axios from "axios";

let logIn = (payload) => {

  payload= {

  }
  const config = {
    method: "GET",
    url: "_A_URL_GOES_HERE",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let register = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url: "_AnOther_URL_GOES_HERE",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


export { logIn, register};