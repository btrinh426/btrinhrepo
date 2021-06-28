import axios from "axios";

let logIn = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getCurrentUsers = () => {
  console.log("getCurrentUsers is firing");
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logOut = () => {
  console.log("logging out");
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getUsersById = (payload) => {
  console.log("getting users by ID");
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + payload,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let register = (payload, onSuccess, onError) => {
  // let register = (payload) => {

  console.log("hello there");

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { logIn, register, getCurrentUsers, logOut, getUsersById }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
