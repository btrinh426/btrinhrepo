import axios from "axios"

let productService = {
    endpoint : "https://api.remotebootcamp.dev/api/entities/Games"
  }
//-----Add Product-----
let addProduct = (payload) =>
{
    const config ={
    method : "POST",
    url : productService.endpoint,
    data : payload,
    withCredentials : true,
    crossdomain : true,
    headers : {"Content-Type" : "application/json"}
    }

    return axios(config)
};
//-----Get All Friends-----
let getAllProducts = (payload) => {

    const config = {
        method : "GET",
        url : productService.endpoint,
        data : payload,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"} 
    };
    return axios(config);
};

export default {addProduct, getAllProducts}