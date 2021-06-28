import axios from "axios";

// Main Login Info
// email:sabio@hotmail.com
// password: passworD1!

var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

//----- Register -----
let register = (newUser) => {
  const config = {
    method: "POST",
    url: usersService.endpoint + "/register",
    data: newUser,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

// ----- Login -----
let login = (payload) => {
  // var payload = {
  //   "email": "mobabbage@gmail.com",
  //   "password": "13Puppies!",
  //   "tenantId": "U015ZRKTQN4"
  // "sabiouser@yahoo.com"
  // "Sabiouser7!"
  // };
  console.log("Logging in");
  const config = {
    method: "POST",
    url: usersService.endpoint + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.error(data);
    });
};

// ----- Get Current User -----

let currentUser = () => {
  const config = {
    method: "GET",
    url: usersService.endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.error(data);
      return Promise.reject(data);
    });
};

// ----- Get Current User by ID -----
let currentUserById = (id) => {
  const config = {
    method: "GET",
    url: usersService.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

// ----- LogOut -----
let logout = () => {
  const config = {
    method: "GET",
    url: usersService.endpoint + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

export { register, login, currentUser, currentUserById, logout };
