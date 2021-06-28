import axios from "axios";

const techCompaniesService = {
    endpoint: "https://api.remotebootcamp.dev/api/techcompanies"
};

export function getAllTechCompanies(pageIndex, pageSize){
    console.log("getAllTechCompanies executing!")
    const config = {
        method: "GET",
        url: `${techCompaniesService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }

    return axios(config)
};