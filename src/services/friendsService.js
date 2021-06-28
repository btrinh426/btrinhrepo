import axios from "axios";
axios.defaults.withCredentials = true;

export let postFriend = (payload) =>
{
  const config =
  {
    method:"Post"
    ,url:"https://localhost:50001/api/friends2"
    ,data:payload
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};

export let getFriends = (pageIndex,pageSize) =>
{
  //parameters for page index / size
  const config= 
  { 
     method:"Get"
    ,url:`https://localhost:50001/api/friends2/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`
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
    ,url:"https://localhost:50001/api/friends2/" + id
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
        ,url: "https://localhost:50001/api/friends2/" + payload.id
        ,data:payload
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

export let friendSearch = (query) => 
{
  const config = 
  {
    method: "Get"
    ,url: `https://localhost:50001/api/friends2/search/?pageIndex=0&pageSize=10&query=${query}`
    ,withCredentials: true
    ,crossdomain: true
    ,headers: {"Content-Type": "application/json"}
  };
  return axios(config);
};