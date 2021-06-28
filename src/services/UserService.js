import axios from "axios";


let logIn = (payload) => {
 
    const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);
}

let current = () => 
{
  const config = {
  method: "GET",
  url:"https://api.remotebootcamp.dev/api/users/current",
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
  }
return axios(config)
}

let currentById = (id) => 
{
  const config = {
  method: "GET",
  url:"https://api.remotebootcamp.dev/api/users/" + id,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
  }
return axios(config)
}

let logOut = () =>
{
  const config = {
    method: "GET",
    url:"https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
    }
  return axios(config)
}

let addRecord = (payload) => {
  const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/entities/records",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);

}

let register = (payload) => {
  const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);
};

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
  return axios(config)
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

let addJob = (payload) =>
{
  const config= {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config)
}

let getJobs = () =>{
  const config = {
    method: "GET",
    url:"https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=5",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
}
return axios(config)
}


export { logIn, addRecord, register, current, currentById, logOut, addFriend, getAll, getFriend, editFriend, deleteCard, searchFriends, addJob, getJobs };