import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/jobs";

let add = (payload) => {
    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let getAll = (index, size) => {
    const config = {
        method: "GET",
        //https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10
        url: endpoint + `?pageIndex=${index}&pageSize=${size}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let getById = (id) => {
    const config = {
      method: "GET",
      url: endpoint + "/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  let deleteById = (id) => {

    const config = {
      method: "PUT",
      url: endpoint + "/" + id + "/0",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
        .then(function(response){
      console.log("deleteById inside .then of return axios(config)", response)  
      return id;
  })
  };

  let search = (index, size, inputText) => {
    const config = {
      method: "GET",
      url: endpoint + `/search?pageIndex=${index}&pageSize=${size}&searchTerm=${inputText}`,
      withCredentials: true,
      crossdomain: true,  //https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=10&searchTerm=developer
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config)
  };


export { add, getAll, getById, deleteById, search };
