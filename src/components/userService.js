import axios from "axios";


let register = (payload, onSuccess, onError) => {
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/users/register",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
    
}


let logIn = (payload) => {

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

//EDIT AFTER ASSESSMENT... PAYLOAD = PARAMETER
let userIdLogIn = (userId) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/login/${userId}`,
    data: userId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};


let logOut = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let makeAFriend = (payload) => {
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

let myFriends = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let makeAProduct = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/foods",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let myProduct = (userId) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/entities/RedEarthOvens/${userId}`,
    data: userId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

  export { register, logIn, userIdLogIn, logOut, makeAFriend, myFriends, makeAProduct, myProduct};   
                      

