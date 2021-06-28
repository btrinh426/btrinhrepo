import axios from "axios";

var userService = {
  userEndpoint: "https://api.remotebootcamp.dev/api/users",
};

userService.userRegister = (userData) => {
  const config = {
    method: "POST",
    url: `${userService.userEndpoint}/register`,
    data: userData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.userLogin = (userData) => {
  // var payload = {
  //   email: userData.email,
  //   password: userData.password,
  //   tenantId: "U01BMEA3V8V",
  // };

  const config = {
    method: "POST",
    url: `${userService.userEndpoint}/login`,
    data: userData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${userService.userEndpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.getUserById = (userId) => {
  const config = {
    method: "GET",
    url: `${userService.userEndpoint}/${userId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.userLogout = () => {
  const config = {
    method: "GET",
    url: `${userService.userEndpoint}/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export default userService;
