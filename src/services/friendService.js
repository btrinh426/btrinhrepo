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

let getTenFriends = () => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/?pageIndex=0&pageSize=10`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateFriendById = (id, payload) => {
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

let getFriendById = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deleteFriendById = (id) => {
  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function () {
    return id;
  });
};

let searchForFriend = (index, size, inputText) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${index}&pageSize=${size}&q=${inputText}`,
    withCredentials: true, //https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=10&q=Amazed
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((res) => {
    return res.config.url;
  });
};

// UPDATE FRIEND STATUS    id integer    statusId NotSet Active Deleted Flagged

let updateFriendStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + id + statusId,
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
  getTenFriends,
  updateFriendById,
  getFriendById,
  deleteFriendById,
  searchForFriend,
  updateFriendStatus,
  getFriendBySlug,
};
