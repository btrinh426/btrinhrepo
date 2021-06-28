import axios from "axios";
axios.defaults.withCredentials=true;


export let login = (payload) => {

    const config = {
      method: "Post",
      url: "https://api.remotebootcamp.dev/api/users/login",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export let postUser = (payload) =>
  {
    const config = {
      method:"Post"
      ,url:"https://api.remotebootcamp.dev/api/users/register"
      ,data:payload
      ,withCredentials: true
      ,crossdomain: true
      ,headers: {"Content-Type": "application/json"}
    }
    return axios(config);
  };

export let logout = () => 
{
  const config =
  {
    method:"Get"
    ,url:"https://api.remotebootcamp.dev/api/users/logout"
    ,withCredentials:true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let userById = (id) =>
{
  const config =
  {
    method:"Get"
    ,url:"https://api.remotebootcamp.dev/api/users/" + id
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let currentUser = () =>
{
  const config = 
  {
    method:"Get"
    ,url:"https://api.remotebootcamp.dev/api/users/current"
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let postFriend = (payload) =>
{
  const config =
  {
    method:"Post"
    ,url:"https://api.remotebootcamp.dev/api/friends"
    ,data:payload
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let getFriends = () =>
{
  const config= 
  { 
     method:"Get"
    ,url:"https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10"
    ,withCredentials:true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let deleteFriend = (id) => 
{
  const config = 
  {
    method:"Delete"
    ,url:"https://api.remotebootcamp.dev/api/friends/" + id
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "applicaion/json"}
  };
  return axios(config)
};

  export default {login,postUser,logout,
    userById,currentUser,postFriend
    ,getFriends,deleteFriend};