import axios from "axios";

const userEndpoint = "https://api.remotebootcamp.dev/api/users";

const userRegister = (userData) => {
  const config = {
    method: "POST",
    url: `${userEndpoint}/register`,
    data: userData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const userLogin = (userData) => {
  // var payload = {
  //   email: userData.email,
  //   password: userData.password,
  //   tenantId: "U01BMEA3V8V",
  // };

  const config = {
    method: "POST",
    url: `${userEndpoint}/login`,
    data: userData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${userEndpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getUserById = (userId) => {
  const config = {
    method: "GET",
    url: `${userEndpoint}/${userId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const userLogout = () => {
  const config = {
    method: "GET",
    url: `${userEndpoint}/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { userEndpoint, userLogin, userLogout, userRegister, getCurrentUser, getUserById };
