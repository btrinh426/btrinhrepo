import axios from "axios";

const userService = {
  login: "https://api.remotebootcamp.dev/api/users/login",
  register: "https://api.remotebootcamp.dev/api/users/register",
};

let logIn = (payload) => {
  console.log(payload);
  const config = {
    method: "POST",
    url: userService.login,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let register = (payload) => {
  const config = {
    method: "POST",
    url: userService.register,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { logIn, register };
