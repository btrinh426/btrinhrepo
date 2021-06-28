import axios from "axios";
axios.defaults.withCredentials=true;

export let postJob = (payload) => 
{
    const config = 
    {
        method: "Post"
        ,url: "https://localhost:50001/api/jobs"
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
        ,url:"https://localhost:50001/api/jobs/" + payload.id
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
        ,url:`https://localhost:50001/api/jobs/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`
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
        ,url:`https://localhost:50001/api/jobs/search/?pageIndex=0&pageSize=3&query=${query}`
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

export let jobDelete = (id) => 
{
    const config =
    {
        method:"Delete"
        ,url:`https://localhost:50001/api/jobs/${id}`
        ,withCredentials: true
        ,crossdomain: true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(()=>id);
};