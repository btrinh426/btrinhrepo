import axios from "axios";

const addFriend = (payload) => {
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

const updateFriend = (payload) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends", //unfinished
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getFriend = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/friends?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addFriend, updateFriend, getFriend };
