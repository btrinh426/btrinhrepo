import axios from "axios";

const endPoint = "https://localhost:50001/api/fAQs/"

const add = (payload) => {

    const config = {
        method: "POST",
        url: endPoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

export { add }