import axios from "axios";


let friendApi =  "https://api.remotebootcamp.dev/api/friends";
let addingFriend = (payload) => {

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

let listFriend= (pageIndex) => {

  const config = {
    method: "GET",
    url: friendApi + "?pageIndex=" + pageIndex + "&pageSize=4",
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

let deleteFriend = (id) => {

  const config = {
    method: "DELETE",
    url: friendApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  .then(function(response){
      console.log("add book success", response)
      
      return id
  })

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






export default {addingFriend, listFriend, deleteFriend, getOneFriend, updateOneFriend, searchFriend}; 