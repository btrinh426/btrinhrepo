import axios from "axios";

var friendService = { endpoint: "https://api.remotebootcamp.dev/api/friends" };
var userService = { endpoint: "https://api.remotebootcamp.dev/api/users" };

let logIn = (payload) => {

  const config = {
    method: "POST",
    url: userService.endpoint + "/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let register = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url:  userService.endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let logInUser = (uId, uName, sId) => {

  const config = {
    method: "GET",
    url:  userService.endpoint + `/login/ + uId + "/%22" + uName + "%22/%22" + sId + "%22"`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let logOutUser = () => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let addFriend = (payload) => {

  const config = {
    method: "POST",
    url: friendService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getTenFriends = () => {
  const config = {
    method: "GET",
    url: `friendService.endpoint + "/" + "?pageIndex=0&pageSize=10"`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let updateFriendById = (id, payload) => {

  const config = {
    method: "PUT",
    url: friendService.endpoint + "/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
}

let getFriendById = (id) => {
  const config = {
    method: "GET",
    url: friendService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let removeFriendById = (id, friendObj) => {
  const config = {
    method: "DELETE",
    url: friendService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(function (res) {
      console.log(res);
      return friendObj;
    });
};

let searchForFriend = (index, size, friend) => {

  const config = {
    method: "GET",
    url: friendService.endpoint + `/search?pageIndex=${index}&pageSize=${size}&q=${friend}`,
    withCredentials: true,  //https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=10&q=Amazed
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then((res) => {
      return res.config.url
    }
    );
};

// UPDATE FRIEND STATUS    id integer    statusId NotSet Active Deleted Flagged

let updateFriendStatus = (id, statusId) => {

  const config = {
      method: "PUT",
      url: friendService.endpoint + "/" + id + statusId,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };
  return axios(config);
}

let getFriendBySlug = (slug) => {
  const config = {
    method: "GET",
    url: friendService.endpoint + "/" + slug,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { logIn, register, logInUser, logOutUser, addFriend, getTenFriends, updateFriendById, getFriendById, removeFriendById, searchForFriend, updateFriendStatus, getFriendBySlug };

