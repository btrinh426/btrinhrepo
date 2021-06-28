import axios from "axios";

let logIn = (payload) => {

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




export { logIn, registerNewUser, getCurrentUser, logUserOut,  getFriends}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }