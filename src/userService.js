import axios from "axios";

// let entityService = {
//     endPt: "https://api.remotebootcamp.dev/api/users",
//     endpoint: "https://api.remotebootcamp.dev/api/entities/cars/",
//   };
  
  // let userLogin = () => {
  //   let payload = {
  //     email: "ledwyn@sabio.com",
  //     password: "Sabio123!",
  //     tenantId: "U01KN0UH2DN",
  //   };
  //   // { REGISTER "POST"
  //   // "id": 5097,  // not used to register
  //   //   "firstName": "Ledwyn",
  //   //   "lastName": "Mena",
  //   //   "email": "ledwynm@sabio.com",
  //   //   "password": "Sabio1234!",
  //   //   "passwordConfirm": "Sabio1234!",
  //   //   "avatarUrl": "https://via.placeholder.com/151",
  //   //   "tenantId": "U01KN0UH2DN"
  //   // }
  //   const config = {
  //     method: "POST",
  //     url: "https://api.remotebootcamp.dev/api/users/login",
  //     data: payload,
  //     crossdomain: true,
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   return axios(config);
  // };
  
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
  config.withCredentials = true;
  return config;
});

let logIn = (payload) => {

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};



// let register = (payload, onSuccess, onError) => {

//   const config = {
//     method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
//     url: "_AnOther_URL_GOES_HERE",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" }
//   };

//   return axios(config);
// };


export { logIn}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }