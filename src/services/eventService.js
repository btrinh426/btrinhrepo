import axios from "axios";



const eventApi = "https://localhost:50001/api/events"

//https://localhost:50001/api/jobs
let addEvent = (payload) => {

    const config = {
      method: "POST",
      url: eventApi,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    // .then(function(response){
    //     console.log("add job success", response)
    //     payload.id = response.data.item
    //     return payload
    // })
  
  };

  let getEvents = (pageIndex) => {

    const config = {
      method: "GET",
      url: eventApi + "?pageIndex=" + pageIndex + "&pageSize=3",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  
  };


let deleteEventById = (id) =>{
  const config = {
    method: "DELETE",
    url: eventApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  .then(function(response){
      
      
      return id
  })

  

}

let getOneEventById = (id) => {

  const config = {
    method: "GET",
    url: eventApi + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let updateOneEventById = (payload, id) => {

  const config = {
    method: "PUT",
    url: eventApi + "/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
  // .then(function(response){
  //     console.log("add book success", response)
  //     payload.id = response.data.item
  //     return payload
  // })

};

let searchEvent = (data,pageIndex) => {
    
  const config = {
    method: "GET",
    url: eventApi + "/search?pageIndex=" + pageIndex + "&pageSize=3&input=" + data,
   
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config) 
}

    
  export default {addEvent, getEvents, deleteEventById,getOneEventById, updateOneEventById, searchEvent}