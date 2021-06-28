import axios from "axios";
import { data } from "jquery";

let logIn = (payload) => {

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

let register = (payload) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let current = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }

  return axios(config);
}

let logOut = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
}

  return axios(config);
}

let userId = (id) => {
  const config ={
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/"+id,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config);
}

let registerTest = (payload) =>{
  const config = {method: "POST",
  url: "https://api.remotebootcamp.dev/api/entities/products",
  data: payload,
  crossdomain: true,
  headers: {"Context-Type": "application/json"}}
  return axios(config);
}

let friendsCall = () =>{
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=1&pageSize=10",
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config)
}

let removePerson = (id) =>{
  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/"+id,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config).then(()=>id);
}

let editPerson = (payload) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/"+payload.id,
    crossdomain: true,
    data: payload,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config)
}

let addFriend = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config)
}

export { addFriend, logIn, register, current, logOut, userId, registerTest, friendsCall, removePerson, editPerson}; 