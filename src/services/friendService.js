import axios from "axios";

let createFriend = (payload, onSuccess, onError) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};

let getFriends = (pageIndex, pageSize) => {

    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}

let updateFriend = (payload) => {

    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/friends/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    }
    return axios(config)
}

let deleteAndPassBack = (payload) => {

    const config = {
        method: "DELETE",
        url: `https://api.remotebootcamp.dev/api/friends/${payload.id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    };

    return axios(config)
        .then(() => {
            return payload.id  // ---this is returning the Id once its successful instead of using responseSuccessHandler
        })                     //--- the closure is being leveraged here
        .catch(responseErrorHandler);
}

// const responseSuccessHandler = response => {
//     console.log("responseSuccessHandler", response)
//     return response.data
// };

const responseErrorHandler = response => {
    console.log("responseErrorHandler", response)
    return response.data
}

export { createFriend, getFriends, updateFriend, deleteAndPassBack }