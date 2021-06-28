import axios from "axios";

let userEndpoint = {
  endpoint: "https://api.remotebootcamp.dev/api/users/",
};

let usersData = (payload) => {
  const config = {
    method: "GET",
    url: `${userEndpoint.endpoint}${payload}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applcation/json" },
  };
  return axios(config);
};

let currentUser = () => {
  const config = {
    method: "GET",
    url: `${userEndpoint.endpoint}current`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let logOut = () => {
  const config = {
    method: "GET",
    url: `${userEndpoint.endpoint}logout`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let logIn = (payload) => {
  payload.tenantId = "U01KN1UDGPJ";
  const config = {
    method: "POST",
    url: `${userEndpoint.endpoint}login`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let registerUser = (payload) => {
  payload.tenantId = "U01KN1UDGPJ";
  const config = {
    method: "POST",
    url: `${userEndpoint.endpoint}register`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default { logIn, registerUser, currentUser, logOut, usersData };
