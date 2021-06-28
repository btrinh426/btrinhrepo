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

export { register };

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

export { logout };

const getCurrentUser = () => {
    const config = {
        method: "GET",
        url: `${userEndpoint}users/current`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export {getCurrentUser};

// apiHandler.getCurrentUserById = (id) => {
//     const config = {
//         method: "GET",
//         url: `${apiHandler.userEndpoint}users/${id}`,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config);    
// }

const addFriend = (friend) => {
    const config = {
        method: "POST",
        url: `${userEndpoint}friends`,
        data: friend,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);    
}

export {addFriend};

// something wrong with call JTG
// https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=20
// https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=20
// 
// https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=20
const getFriends = (idx, pageSize) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}friends?pageIndex=${idx}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}

export {getFriends};

// https://api.remotebootcamp.dev/api/friends/23941
const deleteFriend = (id) => {
    const config = {
        method: "DELETE",
        url: `${userEndpoint}friends/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export {deleteFriend};

// // {
// //     "metaData": {
// //       "dateStart": "2021-04-20T03:08:09.445Z",
// //       "dateEnd": "2021-04-20T03:08:09.445Z",
// //       "location": {
// //         "latitude": 38.9042154626114,
// //         "longitude": -77.26104428894806,
// //         "zipCode": "22180",
// //         "address": "227 Maple Ave E, Vienna, VA"
// //       }
// //     },
// //     "name": "KIM RICHEY",
// //     "headline": "Night 1 (Indoors and Distanced)",
// //     "description": "string",
// //     "summary": "The Songs of Glimmer tour",
// //     "slug": "Huh?",
// //     "statusId": "Active"
// //   }
// apiHandler.addEvent = (event) => {
//     const config = {
//         method: "POST",
//         url: `${apiHandler.userEndpoint}events`,
//         data: event,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config); 
// }

export default {register, logout};