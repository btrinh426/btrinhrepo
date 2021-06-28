import axios from "axios";

const companyApi = "https://api.remotebootcamp.dev/api/techcompanies"

let addCompany = (payload) => {

    const config = {
      method: "POST",
      url: companyApi,
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
  let getCompanies = (pageIndex) => {

    const config = {
      method: "GET",
      url: companyApi + "?pageIndex=" + pageIndex + "&pageSize=3",
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

  export default {addCompany,getCompanies}