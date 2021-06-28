import axios from "axios";

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

let register = (payload) => {

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

let current = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }

  return axios(config);
}

let logOut = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
}

  return axios(config);
}

let userId = (payload) => {
  const config ={
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/"+payload.id,
    data: payload,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config);
}

let registerTest = (payload) =>{
  const config = {method: "POST",
  url: "https://api.remotebootcamp.dev/api/entities/products",
  data: payload,
  crossdomain: true,
  headers: {"Context-Type": "application/json"}}
  return axios(config);
}


export { logIn, register, current, logOut, userId, registerTest}; 