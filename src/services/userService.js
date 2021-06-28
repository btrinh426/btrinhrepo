import axios from "axios";

let register = (payload) => {
    console.log("Registered!")
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let logIn = (payload) => {
    console.log("Logged in.")    
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/login",
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
        url: "https://api.remotebootcamp.dev/api/users/logout",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

const currentUser = () => {
    var config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/users/current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    
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
        url: "https://api.remotebootcamp.dev/api/users/" + anId,
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



export default { logIn, register, logout, currentUser, onCurrentUserOK, onCurrentUserFail }


