import axios from "axios";

let registerUser = (user) => {
  console.log("Newly registered user", user);

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: user,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logIn = (payload) => {
console.log("You are now logged in!", payload);

const config = {
  method: "POST",
  url: "https://api.remotebootcamp.dev/api/users/login",
  data: payload,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);
};

let currentUser = (payload) => {
console.log("Welcome, currently signed in" );

const config = {
  method: "GET",
  url: "https://api.remotebootcamp.dev/api/users/current",
  data: payload,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);
};

let currentUserWithId = (id) => {
console.log("Welcome with id:", id);

const config = {
  method: "GET",
  url: "https://api.remotebootcamp.dev/api/users/" + id,
  data: id,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);
};

let logOut = (id) => {
console.log("Logged out successfully");

const config = {
  method: "GET",
  url: "https://api.remotebootcamp.dev/api/users/logout",
  data: id,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);
};


export { registerUser, logIn, currentUser, currentUserWithId, logOut };
