import axios from "axios";

var friendService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};

// ----- Add New Friend -----
let add = (friend) => {
  const config = {
    method: "POST",
    url: friendService.endpoint,
    data: friend,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

// ----- Get 12 Friends -----
let getFriends = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      friendService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,

    // "?pageIndex=0&pageSize=12"
    // string interprelation or string concatonation
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (data) {
    console.log(data);
    return data;
  });
};

// ----- Get Friend By ID -----
let getById = (id) => {
  const config = {
    method: "GET",
    url: friendService.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

// ----- Edit Friends -----
let editById = (payload, id) => {
  const config = {
    method: "PUT",
    url: friendService.endpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (response) {
    console.log("Edit Friend", response);
    payload.id = id;
    return payload;
  });
};

// ----- Delete Friend -----
let deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: friendService.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (response) {
    console.log("Delete Friend", response);
    return id;
  });
};

// ----- Search for Friend -----
let searchByText = (pageIndex, pageSize, searchResult) => {
  const config = {
    method: "GET",
    url:
      friendService.endpoint +
      `/search?pageIndex=${pageIndex}&pageSize=${pageSize}` +
      "&q=" +
      searchResult,
    // data: headline,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

export { add, getFriends, getById, editById, deleteById, searchByText };
