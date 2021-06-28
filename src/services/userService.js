import axios from "axios";

var userService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

const register = (payload) => {
  const config = {
    method: "POST",
    url: userService.endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    let newUser = payload;
    newUser.id = response.data.item;
    return newUser;
  });
};

const logIn = (payload) => {
  const config = {
    method: "POST",
    url: userService.endpoint + "/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const currUser = () => {
  const config = {
    method: "GET",
    url: userService.endpoint + "/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const userById = (id) => {
  console.log("userById is executing");
  const config = {
    method: "GET",
    url: userService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const logOut = (id) => {
  const config = {
    method: "GET",
    url: userService.endpoint + "/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { register, logIn, currUser, userById, logOut };
