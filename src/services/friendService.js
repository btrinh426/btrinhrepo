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
  console.log("friendService.getAllFriendsPaginated is executing");

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
    url: "https://api.remotebootcamp.dev/api/friends" + "/" + friendId,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

// //   return axios(config).then(() => payload);           ////*** since by default it just returns a status and a transaction-id,
// //                                                       ////*** we do this, so we can get back the data we need to work with!!!
// // }

export { addFriend, getAllFriendsPaginated, deleteById };
