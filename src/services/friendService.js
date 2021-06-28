import axios from "axios";

var friendService = {
  endpoint: "https://localhost:50001/api/friends/",
};

let add = (payload) => {
  const config = {
    method: "POST",
    url: friendService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    let newFriend = payload;
    newFriend.id = response.data.item;
    return newFriend;
  });
};

// friendsService.getFriends = (pageIndex, pageSize) => {
let getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      friendService.endpoint +
      `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

// friendsService.updateFriend = (id, payload) => {
let edit = (id, payload) => {
  console.log("updateFriend is executing", payload);

  const config = {
    method: "PUT",
    url: friendService.endpoint + `/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let search = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url:
      friendService.endpoint +
      `search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    //   let dataPage = response;
    let friendsResponse = response.data.item.pagedItems;
    return friendsResponse;
  });
};

export { add, getAll, edit, search }; // export all your calls here
