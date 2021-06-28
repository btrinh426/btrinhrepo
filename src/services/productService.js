import axios from "axios";

const productEndpoint = "https://api.remotebootcamp.dev/api/entities/products";

const addProduct = payload => {
    const config = {
        method: "POST",
        url: productEndpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };

    return axios(config);
}

export {addProduct};