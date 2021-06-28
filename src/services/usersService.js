import axios from "axios";

let logIn = (payload) => {
  const config = {
    method: "_PICK_A_HTPP_METHOD",
    url: "_A_URL_GOES_HERE",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let register = (payload, onSuccess, onError) => {
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

let create = (payload, entityName, onSuccess, onError) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/" + entityName,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { logIn, register, create };
