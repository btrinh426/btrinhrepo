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

export function getJobById(jobId){
    console.log("getJobById is executing!")
    const config = {
        method: "GET",
        url: `${jobsService.endpoint}/${jobId}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }
    return axios(config)
};

export function editJobById(jobId, formData){
    console.log("editByJobId executing!")
    const config = {
        method: "PUT",
        url: `${jobsService.endpoint}/${jobId}`,
        data: formData,
        crossdomain: true,
        header: {"Content-Type" : "application/json"} 
    }
    return axios(config)
};

export function deleteById(jobId, statusId){
    console.log("deleteById executing!")
    const config = {
        method: "PUT",
        url: `${jobsService.endpoint}/${jobId}/${statusId}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"} 
    }
    return axios(config).then(() => {
        return {
            jobId: jobId
        }
    })
};
