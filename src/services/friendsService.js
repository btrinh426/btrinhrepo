import axios from "axios";

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

let getFriends = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateFriend = (payload, id) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getFriend = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchFriends = (pageIndex, pageSize, q) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/search?${pageIndex}&${pageSize}&${q}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${id}/${statusId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getFriendBySlug = (slug) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + slug,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export {
  addFriend,
  getFriends,
  updateFriend,
  getFriend,
  deleteFriend,
  searchFriends,
  updateStatus,
  getFriendBySlug,
};
