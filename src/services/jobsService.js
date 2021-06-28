import axios from "axios";

const jobsService = {
    endpoint: "https://api.remotebootcamp.dev/api/jobs"
};

export function getAllJobs(pageIndex, pageSize){
    console.log("getAllJobs executing!")
    const config = {
        method: "GET",
        url: `${jobsService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }

    return axios(config)
};

export function addJob(formData){
    console.log("addJobs is executing!")
    const config = {
        method: "POST",
        url: `${jobsService.endpoint}`,
        data: formData,
        crossdomain: true,
        header: {"Content=-Type" : "application/json"}
    }

    return axios(config)
};

export function searchJobs(pageIndex, pageSize, search){
    console.log("searchJobs executing!")
    const config = {
        method: "GET",
        url: `${jobsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${search}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }
    
    return axios(config)
};

