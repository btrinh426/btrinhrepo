import axios from "axios";

const endpoint= "https://api.remotebootcamp.dev/api/users"

const logIn = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let register = (payload) => {

  const config = {
    method: "POST",
    url: endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};


export { logIn, register }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }