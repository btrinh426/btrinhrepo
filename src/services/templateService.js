import axios from "axios";

//complete endpoint
let endpoint = "https://api.remotebootcamp.dev/api/";

let add = (payload) => {
  console.log("add Friend in Ajax");
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let paginate = (pageIndex, pageSize) => {
  console.log("paginate in Ajax");
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getById = (id) => {
  console.log("getById in Ajax");
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let search = (pageIndex, pageSize, id) => {
  console.log("search in Ajax");
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let update = (id, payload) => {
  console.log("update Ajax");
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let remove = (id) => {
  console.log("remove in Ajax");
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => id);
};

export { add, paginate, getById, search, update, remove }; // export all your calls here

// if you had three functions to export
// export { logIn, add, thirdFunction }
