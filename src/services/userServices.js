import axios from "axios";

let  userEndpoint = "https://api.remotebootcamp.dev/api/";
// let tenant = "U01U45PKVM2";

const register = (payload) => {
    // console.log("register");

    const config = {
        method: "POST",
        url: userEndpoint + "users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const login = (payload) => {

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

// // POST login   
// apiHandler.login = (payload) => {
//     const config = {
//         method: "POST",
//         url: apiHandler.userEndpoint + "users/login",
//         data: payload,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config);
// }

// // GET login - not using
// apiHandler.login2 = (userId, userName) => {
//     // console.log ("login");

//     const config = {
//         method: "GET",
//         url: `${apiHandler.userEndpoint}users/login/${userId}/${userName}/${apiHandler.tenant}`,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config);   
// }

const logout = () => {
    const config = {
        method: "GET",
        url: `${userEndpoint}users/logout`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const getCurrentUser = () => {
    const config = {
        method: "GET",
        url: `${userEndpoint}users/current`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

// apiHandler.getCurrentUserById = (id) => {
//     const config = {
//         method: "GET",
//         url: `${apiHandler.userEndpoint}users/${id}`,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config);    
// }

export { register, login, logout, getCurrentUser };