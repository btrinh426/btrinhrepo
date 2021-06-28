import axios from "axios";

export let postUser = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let login = (payload, onSuccess, OnError) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let logout = () => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let userById = (id) => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/users/{userId}",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let currentUser = () => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let postFriends = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getFriends = (id) => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/friends",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let deleteFriends = (id) => {
  const config = {
    method: "Delete",
    url: "https://api.remotebootcamp.dev/api/friends" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postUser,
  login,
  logout,
  userById,
  currentUser,
  postFriends,
  getFriends,
  deleteFriends,
};
