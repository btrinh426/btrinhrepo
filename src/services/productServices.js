import axios from "axios";

let productServices = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/products"
};

productServices.create = payload => {
    const config ={
        method: "POST",
        url: productServices.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
      
    return axios(config);
}

productServices.grabAll = () => {
    const config ={
        method: "GET",
        url: productServices.endpoint,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
      
    return axios(config);
}

productServices.getById = id => {
    const config ={
        method: "GET",
        url: productServices.endpoint + "/" + id,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
      
    return axios(config);
}

productServices.updateProduct = id => {
    const config ={
        method: "PUT",
        url: productServices.endpoint + "/" + id,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
      
    return axios(config);
}

productServices.deleteProduct = id => {
    const config ={
        method: "DELETE",
        url: productServices.endpoint + "/" + id,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
      
    return axios(config);
}

export default productServices