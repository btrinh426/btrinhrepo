import axios from "axios";


let register = (payload) => {

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

let grabAll = (pageIndex) => {

    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=6`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  
let byId = (payload) => {

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/${payload}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let deleteFriend = (payload) => {

  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/friends/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=>payload);
};

let update = (payload) => {

  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let search = (payload) => {

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=6&q=${payload}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};






export {register, grabAll, byId, deleteFriend, update, search};