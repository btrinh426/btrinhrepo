import axios from "axios";

let addFriend = (payload) => {
  console.log("friendService.addFriend is executing", payload);

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getAllFriendsPaginated = (pageIndex, pageSize) => {
  console.log("friendService.getAllFriendsPaginated is executing", {
    pageIndex,
  });

  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/friends" +
      "?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deleteById = (friendId) => {
  console.log("friendService.deleteById is executing");

  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/friends/" + friendId,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getById = (friendId) => {
  console.log("friendService.getById is executing");

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + friendId,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let editFriend = (friendId, payload) => {
  console.log("friendService.editFriend is executing for", friendId);

  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + friendId,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchFriend = (pageIndex, pageSize, q) => {
  console.log("friendService.searchFriend is executing for", q);

  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/friends/search" +
      "?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize +
      "&q=" +
      q,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

// //   return axios(config).then(() => payload);           ////*** since by default it just returns a status and a transaction-id,
// //                                                       ////*** we do this, so we can get back the data we need to work with!!!
// // }

export {
  addFriend,
  getAllFriendsPaginated,
  deleteById,
  getById,
  editFriend,
  searchFriend,
};
