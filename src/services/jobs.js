import axios from "axios";
axios.defaults.withCredentials=true;

export let postJob = (payload) => 
{
    const config = 
    {
        method: "Post"
        ,url: "https://api.remotebootcamp.dev/api/jobs"
        ,data: payload
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config)
};

export let updateJob = (payload) => 
{
    const config = 
    {
        method:"Put"
        ,url:"https://api.remotebootcamp.dev/api/jobs/" + payload.id
        ,data: payload
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

export let getJobs  = (pageIndex,pageSize) => 
{
    const config = 
    {
        method:"Get"
        ,url:`https://api.remotebootcamp.dev/api/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    }; 
    return axios(config);
};

export let jobSearch = (query) => 
{
    const config = 
    {
        method:"Get"
        ,url:`https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=5&searchTerm=${query}`
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

export let jobStatusUpdate = (id) => 
{
    const config =
    {
        method:"Put"
        ,url:`https://api.remotebootcamp.dev/api/jobs/${id}/3`
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};