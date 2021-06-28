import axios from "axios";
import debug from "sabio-debug";
const _logger = debug.extend("friendService");

const baseUrl = `https://api.remotebootcamp.dev/api/friends`;

const deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => id);
};

const editFriend = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => id);
};


const addFriend = (payload) => {
  const config = {
    method: "POST",
    url: baseUrl,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateFriend = () => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev//api/friends/{id}",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};


const getFriends = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(responseSuccessHandler).catch(responseErrorHandler);
};
const responseSuccessHandler = (response) => {
  _logger("responseSuccessHandler", response);
  return response.data;
};
const responseErrorHandler = (error) => {
  _logger("responseErrorHandler", error);
  return error.data;
};



export { getFriends, addFriend, updateFriend, editFriend, deleteFriend };
