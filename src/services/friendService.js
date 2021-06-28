import axios from "axios";

let createFriend = (payload) => {

//   const payload={
//     title: "",
//     bio:"",
//     summary:"",
//     Headline:"",
//     Slug:"",
//     Status:"",
//     Skills:"",
//     primaryImage:""
//   }

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let getFriendInfo = (id) => {
    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/friends/${id}`,
      data: id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
  };

let getFriends = (payload) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

let updateFriend = (id) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

export { getFriendInfo, createFriend, getFriends, updateFriend};