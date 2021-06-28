import axios from "axios";

let logIn = () => {

  const payload={
    firstName: "Cindy",
    lastName: "Hewitt",
    email:"cindy@sabio.la.",
    password:"Sabiopassword123!",
    passwordConfirm: "Sabiopassword123!",
    avatarUrl:"https://images.unsplash.com/photo-1614680108464-931f336bdc22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  }

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let register = (payload) => {

  // let payload ={
  //   firstName: "",
  //   lastName: "",
  //   email:"",
  //   password:"",
  //   passwordConfirm: "",
  //   avatarUrl:""
  // }

  console.log(payload);

  
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

let getUserInfo = (userId) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/${userId}`,
    data: userId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getCurrentUser= (payload) => {
  
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    data:payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);

}

let userLogOut = (payload) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    data:payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}


export { logIn, register, getUserInfo, getCurrentUser, userLogOut};