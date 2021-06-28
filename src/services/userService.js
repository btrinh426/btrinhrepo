import axios from "axios";

let logIn = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let addFriend = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getFriends = (index, size) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${index}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logOut = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let addCar = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/newCars",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let editFriend = (payload, id) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let retrieveFriendById = (id) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchFriends = (index, size, searchWord) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${index}&pageSize=${size}&q=${searchWord}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
export {
  logIn,
  register,
  logOut,
  currentUser,
  addFriend,
  getFriends,
  addCar,
  deleteFriend,
  editFriend,
  retrieveFriendById,
  searchFriends,
}; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
