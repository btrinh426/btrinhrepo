import axios from 'axios'

let ProductService = {}

ProductService.addProduct = (payload) =>
{
    const config = {
        method: "POST",
        url: `https://api.remotebootcamp.dev/api/entities/NashProducts`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default ProductService