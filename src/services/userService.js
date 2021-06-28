import axios from "axios";


let register = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let logIn = (payload) => {

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

let logOut = (payload) => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let getCurrentUser = (payload) => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let getUserId = (payload) => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users" + "/id",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

// toastr["success"]("You have registered your account.", "Success!")
// toastr["error"]("You were unable to register your account.", "Error!")


export { logIn, register, logOut, getCurrentUser, getUserId }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }
