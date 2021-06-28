import axios from "axios";
import React from "react";

let usersLogIn = (payload) => {
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

let usersRegister = (payload) => {
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

let usersCurrent = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let usersLogout = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout/",
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let usersId = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + id,
    data: id,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let friendsCurrent = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=1&pageSize=10",
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let friendsAdd = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: "https://api.remotebootcamp.dev/api/friends",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let assessment1 = (payload) => {
  const config = {
    data: payload,
    url: "https://api.remotebootcamp.dev/api/entities/products",
    method: "POST",
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export {
  usersLogIn,
  usersRegister,
  usersCurrent,
  usersLogout,
  usersId,
  friendsCurrent,
  friendsAdd,
  assessment1,
};
