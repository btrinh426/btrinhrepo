// import React from "react";
import axios from "axios";



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

let register = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config);

}

let logOut = () => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/logout",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config);
}

let getCurrentUser = () => {

    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config)


}

let getById = (id) => {

    const config = {
        method: "GET",
        url: `${"https://api.remotebootcamp.dev/api/users"}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

    return axios(config)
}

let newProduct = (payload) => {
    const config = {

        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }



    }

    return axios(config);

}

let getProducts = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    }
    return axios(config);
}


let getProductsbyId = (id) => {
    const config = {
        method: "GET",
        url: `${"https://api.remotebootcamp.dev/api/entities/products"}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    }
    return axios(config);
}

let endpoint = "https://api.remotebootcamp.dev/api/friends";

let addFriend = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}

let getFriends = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}

let updateFriend = (payload) => {
    const config = {
        method: "PUT",
        data: payload,
        url: `${endpoint}/${payload.id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}
let deleteFriend = (payload) => {
    const config = {
        method: "DELETE",
        data: payload,
        url: `${endpoint}/${payload.id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}
let searchFriends = (pageIndex, pageSize, title) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends/search?pageIndex=${pageIndex}&pageSize=${pageSize}q=${title}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}







export { logIn, register, logOut, getCurrentUser, getById, addFriend, getFriends, updateFriend, deleteFriend, searchFriends, newProduct, getProducts, getProductsbyId }; // export all your calls here