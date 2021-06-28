import axios from "axios";

var userService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

let logIn = (payload) => {
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

let register = (payload) => {
  const config = {
    method: "POST",
    url: userService.endpoint + "/register",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUser = () => {
  const config = {
    method: "GET",
    url: userService.endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    let user = response;
    user.id = response.item;
    return user;
  });
};

let getUser = (id) => {
  const config = {
    method: "GET",
    url: userService.endpoint + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    let user = response;
    user.id = response.item;
    return user;
  });
};

// let register = (payload, onSuccess, onError) => {
//   const config = {
//     method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
//     url: "_AnOther_URL_GOES_HERE",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

export { logIn, register, currentUser, getUser }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
