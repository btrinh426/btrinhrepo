import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/users";

let login = (payload) => {
  
  payload.tenantId = "U018SUYK401"
  const config = {
    method: "POST",
    url: `${endpoint}/login`,
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
    url: `${endpoint}/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUser = () => {
  console.log("currentUser is executing");
  const config = {
    method: "GET",
    url: `${endpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getById = (id) => {
  console.log("getById is executing");
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logout = () => {
  console.log("Logout is executing");
  const config = {
    method: "GET",
    url: `${endpoint}/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { login, register, currentUser, getById, logout }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
