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

let grabAll = () => {

    const config = {
      method: "GET",
      url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=5",
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
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/${payload}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};





export {register, grabAll, byId, deleteFriend};