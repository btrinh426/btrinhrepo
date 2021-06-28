import axios from "axios";

let registerUser = (user) => {
    console.log("Newly registered user", user);
  
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/users/register",
      data: user,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };

let logIn = (payload) => {
  console.log("You are now logged in!", payload);

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

let currentUser = (payload) => {
  console.log("Welcome, currently signed in" );

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    data: payload,
   // withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let currentUserWithId = (id) => {
  console.log("Welcome with id:", id);

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/" + id,
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let logOut = (id) => {
  console.log("Logged out successfully");

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/logout",
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let addFriend = (payload) => {
  console.log("Successfully added friend: ", payload);

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

let getFriends = (payload) => {
  console.log("Successfully loaded friends!");

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let editFriend = (id) => {
  console.log("Successfully edited friend: " + id);

  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let currentFriendWithId = (id) => {
  console.log("Welcome with id:", id);

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/friends/" + id,
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export { logIn, registerUser, currentUser, currentUserWithId, logOut, addFriend, getFriends, editFriend, currentFriendWithId}; // export all your calls here

// .then(()=> id)

  

  //---------

  // friendService.add = (data) => {
  //   console.log("Newly registered user", data);
  
  //   const config = {
  //     method: "POST",
  //     url: friendService.endPtRg,
  //     data: getFormData(),
  //     crossdomain: true,
  //     headers: { "Content-Type": "application/json" },
  //   };
  
  //   return axios(config);
  // };

 // { REGISTER "POST"
    // "id": 5097,  // not used to register
    //   "firstName": "Ledwyn",
    //   "lastName": "Mena",
    //   "avatarUrl": "https://via.placeholder.com/151",
  // }




  //   FriendsService.getAll = () => {
//     console.log("Showing all Cars");
  
//     const config = {
//       method: "GET",
//       url: FriendsService.endpoint,
//       // data: payload,
//       crossdomain: true,
//       headers: { "Content-Type": "application/json" },
//     };
  
//     return axios(config);
//   }; 
//   FriendsService.delete = (id) => {
//     console.log("Deleting  the following car with id:", id);
  
//     const config = {
//       method: "DELETE",
//       url: FriendsService.endpoint + id,
//       data: id,
//       crossdomain: true,
//       headers: { "Content-Type": "application/json" },
//     };
  
//     return axios(config).then(()=> id)
//   };
  
//   FriendsService.update = (data) => {
//     console.log("Updating car:", data);
  
//     const config = {
//       method: "PUT",
//       url: FriendsService.endpoint + $("#inputId").val(),
//       data: getFormData(),
//       crossdomain: true,
//       headers: { "Content-Type": "application/json" },
//     };
  
//     return axios(config);
//   };
  
// var friendService = {
//     endPt: "https://api.remotebootcamp.dev/api/users",
//     endPtRg: "https://api.remotebootcamp.dev/api/users/register",
//     endpoint: "https://api.remotebootcamp.dev/api/friends/",
//   };
  
 
// firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       passwordConfirm: "",
//       avatarUrl: "",
//       tenantId: "",