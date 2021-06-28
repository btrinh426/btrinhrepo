import axios from "axios";

let endpointUser = "https://localhost:50001/api/userV2";
let userLogin = (payload) => {
  const config = {
    method: "POST",
    url: endpointUser + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let getUserLogout = () => {
  const config = {
    method: "GET",
    url: endpointUser + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let add = (payload) => {
  const config = {
    method: "POST",
    url: endpointUser + "/register",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let getCurrentUser = () => {
  const config = {
    method: "GET",
    url: endpointUser + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let getUserNameById = (id) => {
  const config = {
    method: "GET",
    url: endpointUser + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { userLogin, getUserLogout, add, getCurrentUser, getUserNameById };
