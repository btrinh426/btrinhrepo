import axios from "axios";


let friendApi =  "https://localhost:50001/api/friends";
let addFriend = (payload) => {

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

let getFriend= (pageIndex) => {

  const config = {
    method: "GET",
    url: friendApi + "/paginate?pageIndex=" + pageIndex + "&pageSize=4",
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

let deleteFriendById = (id) => {

  const config = {
    method: "DELETE",
    url: friendApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  .then(function(response){
      console.log("add friend success", response)
      
      return id
  })

};

let getOneFriendById = (id) => {

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

let updateOneFriendById = (payload, id) => {

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

let searchFriend = (data,pageIndex) => {
  
  const config = {
    method: "GET",
    url: friendApi + '/search?pageIndex='+ pageIndex + '&pageSize=4&input=' + data,
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






export default {addFriend, getFriend, deleteFriendById, getOneFriendById, updateOneFriendById, searchFriend}; 