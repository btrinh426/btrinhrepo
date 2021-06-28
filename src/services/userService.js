import axios from "axios";

let logIn = (payload) => {

  const config = {
    method: "GET",
    url: "https://localhost:50001/api/temp/auth/login/8343/morgan/CEO",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let register = (payload, onSuccess, onError) => {

  const config = {
    method: "POST",
    url: "https://localhost:50001/api/users",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let currentUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

let logoutCurrentUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
  
}

let getUserInfo = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
  
}

let friendApi =  "https://api.remotebootcamp.dev/api/friends";
let friendReigster = (payload) => {

  const config = {
    method: "POST",
    url: friendApi,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  .then(function(response){
      console.log("add book success", response)
      payload.id = response.data.item
      return payload
  })

};

let listPeople = () => {

  const config = {
    method: "GET",
    url: 'https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10',
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let deletePeople = (id) => {

  const config = {
    method: "DELETE",
    url: friendApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let getOneFriend = (id) => {

  const config = {
    method: "GET",
    url: friendApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let updateOneFriend = (payload, id) => {

  const config = {
    method: "PUT",
    url: friendApi + "/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let searchFriend = (data) => {
  const config = {
    method: "GET",
    url: 'https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=10&q=' + data,
    data: data,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

}






export default { logIn, register, currentUser, logoutCurrentUser, getUserInfo, friendReigster, listPeople, deletePeople, getOneFriend, updateOneFriend, searchFriend}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }