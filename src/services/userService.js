import axios from "axios";

//const baseUrl = "https://api.remotebootcamp.dev/api/users"

const logIn = (payload) => {

    console.log("inside the Login ajax call")

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

function registerNewUser(payload) {

    console.log("in register user call");

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
    /*.then(function (response) {
        let newID = response.data.item;
        payload.id = newID;
        return payload;
    });*/
}
function getCurrentUser()
{
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
function logUserOut()
{
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
function getFriends()
{
    
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
function addFriend(payload) {

    console.log("Trying to add a new friend");

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
   
}
function getFriendById(id)
{
    
    let newURL = String(id);
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/"+ newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

    
}
function updateFriend(friendId, payload)
{
    let newURL = String(friendId);
    console.log(payload);
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/"+ newURL,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
}
function searchFriends(fsearch)
{
    //hardcoding in the pagination for sanitys sake
    let newURL = String(fsearch);
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=10&q="+ newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

function deleteFriend  (id) {

    let newURL = String(id);

    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/" + newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => id);
};

function getUserById(uId)
{
    let newUrl = String(uId);
    console.log(uId);
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/"+ newUrl,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config) 
    

}



export { logIn, registerNewUser, getCurrentUser, logUserOut,  
    getFriends, addFriend, getFriendById, updateFriend, searchFriends, deleteFriend,
getUserById}; 
    // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }