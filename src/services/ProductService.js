import axios from "axios";

let product = (payload) => {
    console.log("Product ordered")
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export default { product }