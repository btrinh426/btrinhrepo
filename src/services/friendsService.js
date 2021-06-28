import axios from "axios";

const friendsService = {
  add: "https://api.remotebootcamp.dev/api/friends",
  getItems:
    "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=100",
  del: "https://api.remotebootcamp.dev/api/friends/",
};
const byeFriend = (payload) => {
  const config = {
    method: "DEL",
    url: friendsService.del + payload,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
const addFriend = (payload) => {
  const config = {
    method: "POST",
    url: friendsService.add,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
let getFriends = () => {
  const config = {
    method: "GET",
    url: friendsService.getItems,
    // withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { friendsService, addFriend, getFriends, byeFriend }; // export all your calls here
