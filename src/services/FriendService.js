import axios from "axios";


let addFriend = (payload) => {
    const config = {
      method: "POST",
      url:"https://localhost:50001/api/friends",
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
      url:`https://localhost:50001/api/friends/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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
      url:`https://localhost:50001/api/friends/${id}`,
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
      url:`https://localhost:50001/api/friends/${id}`,
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
      url: `https://localhost:50001/api/friends/${id}`,
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
      url:`https://localhost:50001/api/friends/search?pageIndex=0&pageSize=50&query=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
      }
  
    return axios(config)
  }

  export {addFriend, getAll, getFriend, editFriend, deleteCard, searchFriends,}