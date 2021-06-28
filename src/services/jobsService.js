import axios from 'axios';

const addJob =(payload)=> {
    const config = {
        method : "POST",
        url:"https://api.remotebootcamp.dev/api/jobs",
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getJobs=()=> {
    const config = {
        method : "GET",
        url:"https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10",
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getJobsPaginate=(page) => {
    const config = {
        method : "GET",
        url:`https://api.remotebootcamp.dev/api/jobs?pageIndex=${page}&pageSize=10`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
}

const searchJobs = (searchItem) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=10&searchTerm=${searchItem}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const searchJobsPaginate = (page, searchItem) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=${page}&pageSize=10&searchTerm=${searchItem}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getJobById = (id) => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs/"+id,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const editJob = (id, payload) => {
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/jobs/"+id,
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const deleteJob = (id) => {
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/jobs/"+id+"/4",
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config)
        .then(() => id)
};

export {
    addJob,
    getJobs,
    getJobsPaginate,
    searchJobsPaginate,
    searchJobs,
    getJobById,
    editJob,
    deleteJob
}