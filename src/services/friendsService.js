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

export let getFriends = (pageIndex, pageSize) => {
  const config = {
    method: "Get",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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
  return axios(config).then(() => id);
};
export let updateFriends = (payload) => {
  console.log(payload);
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/friends/" + payload.id,
    data: payload,
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
