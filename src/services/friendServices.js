import axios from "axios";

let addNewFriend = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let allFriends = (index, size) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${index}&pageSize=${size}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let editFriend = (payload) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${payload.id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => payload);
};

let deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => id);
};

let searchFriends = (q) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=6&q=${q}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config); //.then(() => q);
};

export { addNewFriend, allFriends, editFriend, deleteFriend, searchFriends };
