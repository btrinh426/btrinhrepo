import axios from "axios";

let friendService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};

let getFriends = (page) => {
  const config = {
    method: "GET",
    url: `${friendService.endpoint}?pageIndex=${page}&pageSize=10`,
  };
  return axios(config);
};

let searchFriends = (query, page) => {
  const config = {
    method: "GET",
    url: `${friendService.endpoint}/search?pageIndex=${page}&pageSize=10&q=${query}`,
  };
  return axios(config);
};

let registerFriend = (payload) => {
  const config = {
    method: "POST",
    url: `${friendService.endpoint}`,
    data: payload,
  };
  return axios(config);
};

let updateFriend = (payload) => {
  let id = payload.id;
  const config = {
    method: "PUT",
    url: `${friendService.endpoint}/${id}`,
    data: payload,
  };
  return axios(config);
};

let deleteFriend = (payload) => {
  let id = payload.id;
  const config = {
    method: "DELETE",
    url: `${friendService.endpoint}/${id}`,
    data: payload,
  };
  return axios(config).then(() => payload.id);
};

export {
  registerFriend,
  getFriends,
  searchFriends,
  updateFriend,
  deleteFriend,
};
