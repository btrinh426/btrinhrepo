import axios from "axios";

let addFriend = (payload) => {
  console.log("Successfully added friend: ", payload);

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

let getFriends = (pageIndex, pageSize) => {
  console.log("Successfully loaded friends!");

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let editFriend = (payload, id) => {
  console.log("Successfully edited friend: " + id);

  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let currentFriendWithId = (data, id) => {
  console.log("Welcome with id:", id);

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: {},
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=> data)
};

let deleteFriend = (id) => {
  console.log("Deleted friend with id:", id);

  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=> id);
};

let searchFriend = (query, pageIndex, pageSize) => {
  console.log("search results are: ", query);

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export { addFriend, getFriends, editFriend, currentFriendWithId, deleteFriend, searchFriend}; // export all your calls here
