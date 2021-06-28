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
  }

export let logOut = () => 
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
}

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

  export default {login,postUser,logOut,userById,currentUser};