import axios from "axios";

var usersService = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
  };

export function loginUser(payload){
    console.log("loginUser is executing", payload);
  
    const config = {
      method: "POST",
      url: `${usersService.endpoint}/login`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
};

export function registerUser(payload){
  console.log("registerUser is executing", payload)

  const config = {
    method: "POST",
    url: `${usersService.endpoint}/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export function getCurrentUser(){
console.log("currentUser is executing")

const config = {
  method: "GET",
  url: `${usersService.endpoint}/current`,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);

};

export function getUserById(userId){
console.log("getByUserId executing")

  const config = {
    method: "GET",
    url: `${usersService.endpoint}/${userId}`, 
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);

};

export function logoutUser(){
console.log("user logged out")

const config = {
  method: "GET",
  url: `${usersService.endpoint}/logout`,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
};

return axios(config);

};