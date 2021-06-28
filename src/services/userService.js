import axios from "axios";

let userService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

let getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${userService.endpoint}/current`,
  };

  return axios(config);
};

let getUserById = (id) => {
  const config = {
    method: "GET",
    url: `${userService.endpoint}/${id}`,
    data: id,
  };
  return axios(config);
};

let logIn = (payload) => {
  const config = {
    method: "POST",
    url: `${userService.endpoint}/login`,
    data: payload,
  };

  return axios(config);
};

let logOut = () => {
  const config = {
    method: "GET",
    url: `${userService.endpoint}/logout`,
  };

  return axios(config);
};

let register = (payload) => {
  const config = {
    method: "POST",
    url: `${userService.endpoint}/register`,
    data: payload,
  };

  return axios(config);
};

export { logIn, register, getCurrentUser, logOut, getUserById };
