import axios from "axios";

// var friendService = { endpoint: "https://api.remotebootcamp.dev/api/friends" };
// var userService = { endpoint: "https://api.remotebootcamp.dev/api/users" };

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

let register = (payload, onSuccess, onError) => {
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

let logInUser = (uId, uName, sId) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/login/ + uId + "/%22" + uName + "%22/%22" + sId + "%22"`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getUserById = (iD) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + iD,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let logOutUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
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

let deleteFriend = (id) => {
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
  getUserById,
  getUser,
  logIn,
  register,
  logInUser,
  logOutUser,
  addFriend,
  getTenFriends,
  updateFriendById,
  getFriendById,
  deleteFriend,
  searchForFriend,
  updateFriendStatus,
  getFriendBySlug,
};
