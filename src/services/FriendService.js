import axios from "axios";


let addFriend = (payload) => {
    const config = {
      method: "POST",
      url:"https://api.remotebootcamp.dev/api/friends",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  
    };
  
    return axios(config);
  }
  
  let getAll = (pageIndex, pageSize) =>
  {
    const config = {
      method: "GET",
      url:"https://api.remotebootcamp.dev/api/friends?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
      }
  
    return axios(config)
  }
  
  let getFriend = (id) =>
  {
    const config = {
      method: "GET",
      url:"https://api.remotebootcamp.dev/api/friends/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
      }
  
    return axios(config)
  }
  
  let editFriend = (id, payload) =>
  {
    const config = {
      method: "PUT",
      url:"https://api.remotebootcamp.dev/api/friends/" + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
      }
  
    return axios(config)
  }
  
  let deleteCard = (id) =>
  {
    const config = {
      method: "DELETE",
      url: "https://api.remotebootcamp.dev/api/friends/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    }
    return axios(config).then(()=>{
  
  
      return id;
    })
  }
  
  let searchFriends = (query) =>
  {
    const config = {
      method: "GET",
      url:"https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=25&q=" + query,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
      }
  
    return axios(config)
  }

  export {addFriend, getAll, getFriend, editFriend, deleteCard, searchFriends,}