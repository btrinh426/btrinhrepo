import axios from "axios";


let login = (loginInfo) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
        data: loginInfo,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let register = (formInfo) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: formInfo,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};


let currentUser = () => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    

    return axios(config)

};



let currentUserID = (userId) => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/{userId}",
        data: userId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    
    return axios(config)

};


let loggedOut = () => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    
    return axios(config)

};

let addEntity = (productInfo) => {
   

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: productInfo,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}



let formInput = (formInfo) => {

    const config = {
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: formInfo,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let getUser = () => {

    const config = {
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    
    return axios(config)

};

export {login, register, currentUser, currentUserID, loggedOut, addEntity, formInput, getUser };






// export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }