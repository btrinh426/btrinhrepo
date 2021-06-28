import axios from "axios";
import endpoint from "./endpointService.js";

const userEndpoint = `${endpoint}users`;

//next time create test checkpoints

let pingTest = () => {
  console.log("AJAX Ping Test", endpoint);
  const config = {
    method: "GET",
    url: `${endpoint}ping`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let login = (payload) => {
  console.log("login Ajax");
  payload.tenantId = "U018SUYK401";
  const config = {
    method: "POST",
    url: `${userEndpoint}/login`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let register = (payload) => {
  console.log("register Ajax");
  payload.tenantId = "U018SUYK401";
  const config = {
    method: "POST",
    url: `${userEndpoint}/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUser = () => {
  console.log("currentUser Ajax");
  const config = {
    method: "GET",
    url: `${userEndpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getById = (id) => {
  console.log("getById Ajax");
  const config = {
    method: "GET",
    url: `${userEndpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logout = () => {
  console.log("logout Ajax");
  const config = {
    method: "GET",
    url: `${userEndpoint}/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { pingTest, login, register, currentUser, getById, logout }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
