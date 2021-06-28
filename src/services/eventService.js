import axios from "axios";

//osnt endpoint  "http://localhost:50000/api/events";

const getEvents = () =>
{
    
    const config = {
        method: "GET",
        url: "http://localhost:50000/api/events",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}

const getExclusion = (id) =>
{
    
    const config = {
        method: "GET",
        url: "http://localhost:50000/api/events/" + id,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}

const addEvent = (payload) =>
{
    
    const config = {
        method: "POST",
        url: "http://localhost:50000/api/events",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}



export {getEvents, getExclusion, addEvent}