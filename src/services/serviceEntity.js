import axios from "axios"

const entityService =
{
    endPoint: "https://api.remotebootcamp.dev/api/entities/amazons"
}

const create = (payload) => {

    const config = {
        method: "POST",
        url: entityService.endPoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};

const getList = () => {

    const config = {
        method: "GET",
        url: entityService.endPoint,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
};




export { create, getList }