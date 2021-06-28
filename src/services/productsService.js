import axios from "axios";

const productsService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/products"
};

export function addProduct(formData){
    console.log("addProduct is executing!")
    const config = {
        method: "POST",
        url: `${productsService.endpoint}`,
        data: formData,
        crossdomain: true,
        content: {"Content-Type" : "application/json"}
    }
    return axios(config)
};