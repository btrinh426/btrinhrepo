import axios from "axios";

let add = (payload) => {

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


let updateById = (payload) => {

  const config = { 
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let friendsPaginated = (index, size) => {

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=" + index + "&pageSize=" + size,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


// let userById = (payload) => {

//   const config = {
//     method: "GET",
//     url: "https://api.remotebootcamp.dev/api/users/",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" }
//   };

//   return axios(config);
// };



// let logout = () => {

//   const config = {
//     method: "GET",
//     url: "https://api.remotebootcamp.dev/api/users/logout",
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" }
//   };

//   return axios(config);
// };

export default { add, updateById, friendsPaginated }; 