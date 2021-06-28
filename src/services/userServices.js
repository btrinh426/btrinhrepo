import axios from "axios";

let createEntity = (productPayload) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/products",
    data: productPayload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  

  return axios(config);
};

let logIn = (payload) => {

  payload.tenantId = "1234567"

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
  
  payload.tenantId = "1234567"

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

let currentUser = (payload) => {

  payload.tenantId = "1234567"

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

export { logIn, register, currentUser, createEntity}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }