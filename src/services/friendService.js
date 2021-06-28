// import axios from "axios";

// let addFriend = (payload) => {
//   const config = {
//     method: "POST",
//     url: "https://api.remotebootcamp.dev/api/friends",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

// let getFriends = () => {
//   const config = {
//     method: "GET",
//     url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=3",
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

// let getFriendById = (id) => {
//   const config = {
//     method: "GET",
//     url: "https://api.remotebootcamp.dev/api/friends/" + id,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };
//   return axios(config);
// };

// let deleteById = (id) => {
//   const config = {
//     method: "DELETE",
//     url: "https://api.remotebootcamp.dev/api/friends/" + id,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };
//   return axios(config);
// };

// let updateById = (id) => {
//   const config = {
//     method: "PUT",
//     url: "https://api.remotebootcamp.dev/api/friends/" + id,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };
//   return axios(config);
// };

// export { addFriend, getFriends, getFriendById, deleteById, updateById };
