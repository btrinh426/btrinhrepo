import axios from "axios";
axios.defaults.withCredentials = true;

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
    ,url:"https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=5"
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
  return axios(config).then(()=>id)
};

export let getFriendById = (id) =>
{
    const config = 
    {
        method: "Get"
        ,url:"https://api.remotebootcamp.dev/api/friends/" + id
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config)
};

export let updateFriend = (payload) => 
{
    const config = 
    {
        method: "Put"
        ,url: "https://api.remotebootcamp.dev/api/friends/" + payload.id
        ,data:payload
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};