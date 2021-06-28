import axios from "axios";
let userService = {
  endpoint: "https://api.remotebootcamp.dev/api/users"
};

let logIn = (payload) => {

  const config = {
    method: "POST",
    url: userService.endpoint + "/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let register = (payload) => {

  const config = {
    method: "POST",
    url: userService.endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let getCurrent = () => {

  const config = {
    method: "get",
    url: userService.endpoint+"/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let getById = (id) => {

  const config = {
    method: "get",
    url: userService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let logOut = () => {

  const config = {
    method: "get",
    url: userService.endpoint+ "/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


export {logIn,register,getCurrent, getById, logOut}; // export all your calls here
