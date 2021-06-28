import axios from "axios";
axios.defaults.withCredentials=true;

export let postProduct = (payload) => 
{
    const config = 
    {
        method: "Post"
        ,url: "https://api.remotebootcamp.dev/api/entities/poducts"
        ,data: payload
        ,withCredentials: true
        ,crossdomain:true
        ,headers: {"Content-Type": "application/json"}
    };
    return axios(config)
};


