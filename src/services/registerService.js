import axios from "axios";

let registerUser = (load) => {

    var payload = {
        "firstName": load.firstName,
        "lastName": load.lastName,
        "email": load.email,
        "password": load.password,
        "passwordConfirm": load.passConfirm,
        // "avatarUrl": "https://api.remotebootcamp.dev//apihelp/rbclogo.png",
        "avatarUrl": load.avatar,
        "tenantId": "U01KN1UFYCQ"
    }

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/users/register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

export default registerUser