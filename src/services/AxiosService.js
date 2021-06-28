import axios from "axios";

const submitProducts = (payload) => {
    console.log(payload)
    const config = {
     method: "POST",
     url: "https://api.remotebootcamp.dev/api/entities/products",
     data: payload,
     withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
   };
  
   return axios(config);
  };

  const getProducts = (data) => {
    console.log("Get")
    const config = {
     method: "GET",
     url: "https://api.remotebootcamp.dev/api/entities/products",
      withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
    
   };
  
   return axios(config);
  };
  
  const userLogOut = () => {
    console.log("Logged Out")
    const config = {
     method: "GET",
     url: "https://api.remotebootcamp.dev/api/users/logout",
      withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
    
   };
  
   return axios(config);
  };

  const register = (payload) => {
    console.log(payload)
    const config = {
     method: "POST",
     url: "https://api.remotebootcamp.dev/api/users/register",
     data: payload,
     withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
   };
  
   return axios(config);
  };

  const userInfo = (payload) => {
    console.log(payload)
    const config = {
     method: "POST",
     url: "https://api.remotebootcamp.dev/api/entities/usernames",
     data: payload,
     withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
    
   };
  
   return axios(config);
  };
  
const userCurrent = (data) => {
  console.log("hello")
  const config = {
   method: "GET",
   url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
   crossdomain: true,
   headers: { "Content-Type": "application/json" }
  
 };

 return axios(config);
};

const getUserId = (payload) => {
  console.log(payload)
  const config = {
   method: "GET",
   url: "https://api.remotebootcamp.dev/api/users/"+payload,
   data: payload,
   withCredentials: true,
   crossdomain: true,
   headers: { "Content-Type": "application/json" }
 };

 return axios(config);
};

const friendSubmit = (payload) => {
  console.log(payload)
  const config = {
   method: "POST",
   url: "https://api.remotebootcamp.dev/api/friends",
   data: payload,
   withCredentials: true,
   crossdomain: true,
   headers: { "Content-Type": "application/json" }
  
 };

 return axios(config);
};

const friendCurrent = () => {
  console.log()
  const config = {
   method: "GET",
   url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
    withCredentials: true,
   crossdomain: true,
   headers: { "Content-Type": "application/json" }
  
 };

 return axios(config);
};

const friendEdit = (payload) => {
  console.log(payload)
  const config = {
   method: "PUT",
   url: "https://api.remotebootcamp.dev/api/friends/",
   data: payload,
   withCredentials: true,
   crossdomain: true,
   headers: { "Content-Type": "application/json" }
  
 };

 return axios(config);
};


  export{
    submitProducts,
    getProducts,
    userLogOut,
    register,
    userInfo,
    userCurrent,
    getUserId,
    friendSubmit,
    friendCurrent,
    friendEdit

  }