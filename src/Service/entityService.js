import axios from "axios"


let addEntity = (productInfo) => {
   

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: productInfo,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)