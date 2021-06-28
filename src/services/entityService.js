import axios from "axios";

var entityService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/Machines/",


}

entityService.new = (payload) => {
    const config = {
        method: "POST",
        url: entityService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

entityService.getAll = () => {
    const config = {
        method: "GET",
        url: entityService.endpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

entityService.delete = (id) => {
    const config = {
        method: "DELETE",
        url: entityService.endpoint + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

export default entityService;