import axios from "axios";

const userServices = {
    login: "https://api.remotebootcamp.dev/api/users/login",
    id: "https://api.remotebootcamp.dev/api/users/",
    current: "https://api.remotebootcamp.dev/api/users/current",
    register: "https://api.remotebootcamp.dev/api/users/register",
    logout: "https://api.remotebootcamp.dev/api/users/logout",
};

let logIn = payload => {
    console.log(payload);
    const config = {
        method: "POST",
        url: userServices.login,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let register = payload => {
    //(payload, onSuccess, onError) How to use ??
    const config = {
        method: "POST",
        url: userServices.register,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let logout = () => {
    const config = {
        method: "GET",
        url: userServices.logout,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

const currentUser = () => {
    var config = {
        method: "GET",
        url: userServices.current,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    //console.log(config);
    return axios(config);
};

const onCurrentUserOK = res => {
    const userId = res.data.item.id;
    console.log("User Detected: ", userId);
    getUserInfo(userId);
};

const onCurrentUserFail = res => console.log(res);

const getUserInfo = anId =>
    getUserId(anId).then(userInfoSuccess).catch(userInfoFail);

const getUserId = anId => {
    //console.log("Logging on");
    const config = {
        method: "GET",
        url: userServices.id + anId,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

const userInfoSuccess = response => {
    //console.log(response.data.item);
    let userObj = response.data.item;
    const user = {};
    user.firstName = userObj.firstName;
    user.lastName = userObj.lastName;
    user.id = userObj.id;
    user.email = userObj.email;
    user.photo = userObj.avatarUrl;

    console.log(user);
};

const userInfoFail = response => console.error(response);

export {
    logIn,
    register,
    logout,
    currentUser,
    onCurrentUserFail,
    onCurrentUserOK,
    getUserId,
}; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
