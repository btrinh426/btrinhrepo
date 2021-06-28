import axios from "axios";

const userRegister = (payload) => {
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

const getLogIn = () => {
  let payload = {
    email: " ",
    password: " ",
  };
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/login/5379/Fred/UKEU4037",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const userLogOut = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { getLogIn, userRegister, userLogOut }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
