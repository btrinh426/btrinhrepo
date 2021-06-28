import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/users/";

export let logIn = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export let register = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export let logOut = () => {

  const config = {
    method: "GET",
    url: endpoint + "logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export let currentUser = () => {

  const config = {
    method: "GET",
    url: endpoint + "current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export default { logIn , register , logOut, currentUser }; 