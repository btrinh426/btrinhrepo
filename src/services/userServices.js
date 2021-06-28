import axios from 'axios'

var endpoint = 'https://api.remotebootcamp.dev/api/users/';

let logIn = (payload) => {

    const config = {
        method: "POST",
        url: endpoint + 'login',
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {
            "Content-Type": "application/json"
        }
    };

    return axios(config);
};


let register = (payload, onSuccess, onError) => {

    const config = {
        method: endpoint + 'POST',
        url: endpoint + 'register',
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {
            "Content-Type": "application/json"
        }
    };

    return axios(config);
};

let getCurrent = () => {
    const config = {
        method: "GET",
        url: endpoint + 'current',
        withCredentials: true,
        crossdomain: true,
        headers: {
            "Content-Type": "application/json"
        }

    }
    return axios(config);
}


export {
    logIn,
    register,
    getCurrent
}; // export all your calls here