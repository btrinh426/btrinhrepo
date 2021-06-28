import axios from "axios";


let addCar = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/cars",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};

let getCars = ()=>{
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/entities/cars",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)  
}

let updateCar = (payload)=>{

    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/entities/cars/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    }
    return axios(config)
}

let DeleteCar = (payload)=>{
    
        const config = {
            method: "DELETE",
            url: `https://api.remotebootcamp.dev/api/entities/cars/${payload.id}`,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
    
        }
        return axios(config)
    
    }


export {addCar, getCars, updateCar, DeleteCar}