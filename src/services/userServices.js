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

let getCurrentUser = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  

  return axios(config);
};

let getUserInfo = (userId) => {

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/${userId}`,
    data: userId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  

  return axios(config);
};

let userLogout = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  

  return axios(config);
};


let getFriends = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    params: {
      pageIndex: 0,
      pageSize: 50
    }
  };
  

  return axios(config);
};

let deleteFriend = (userId) => {

  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/friends/${userId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },

  };

  return axios(config)
};



export { logIn, register, getCurrentUser, createEntity, getUserInfo, userLogout, getFriends, deleteFriend,  }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }