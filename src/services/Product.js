import axios from "axios";

var productService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/products"
  };

productService.post = (payload) => {

const config = {
    method: "POST",
    url: productService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
};

return axios(config).then(onSuccess).catch(onError)
};

