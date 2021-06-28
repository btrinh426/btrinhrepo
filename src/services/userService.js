import axios from "axios";


const logIn = (payload) => {

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

const register = (payload) => {

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

const logout = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const submitProduct = (payload) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/products",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const getCurrent = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const getId = (id) => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + id, 
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const createFriend = (payload) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const getFriends = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=4",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const deleteById = (id) => {

  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/"+ id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=> id)
};

const updateFriend = (payload) => {

  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};



export { logIn, 
  register, 
  logout, 
  submitProduct, 
  getCurrent, 
  getId, 
  createFriend, 
  getFriends, 
  deleteById,
  updateFriend
};