import axios from "axios"

let tcService = {
    endpoint : "https://api.remotebootcamp.dev/api/techcompanies"
}
//-----Add Tech Company-----
let addTc = (payload , onAddTcSuccess, onAddTcError) =>
{
    const config = {
        method : "POST",
        url : tcService.endpoint,
        data : payload,
        withCredentials : true,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };

    return axios(config)
};

//-----Get Paginated Tech Companies-----
let getAllTc = (pageIndex, pageSize) => {
    const config = {
        method : "GET",
        url : tcService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };
    return axios(config);
};