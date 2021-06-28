import axios from "axios";

const endpoint= "https://api.remotebootcamp.dev/api/users"

const logIn = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let register = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let currentUser = (payload) => {

  const config = {
    method: "GET",
    url: endpoint + "/current",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let getById = (id) => {

  const config = {
    method: "GET",
    url: endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let logOutUser = (payload) => {

  const config = {
    method: "GET",
    url: endpoint + "/logout",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
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

  return axios(config)
}


export { logIn, register, currentUser, getById, logOutUser, logOut }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }