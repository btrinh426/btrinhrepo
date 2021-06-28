import axios from "axios";

export let postFriends = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let getFriends = () => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let deleteFriends = (id) => {
  const config = {
    method: "Delete",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let updateFriends = (id) => {
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postFriends,
  getFriends,
  deleteFriends,
  updateFriends,
};
