import axios from "axios"

let tcService = {
    endpoint : "https://api.remotebootcamp.dev/api/techcompanies"
}
//-----Add Tech Company-----
let addTc = (payload , onAddTcSuccess, onAddTcError) =>
{
    const config = {
        method : "POST",
        url : tcService.endpoint,
        data : payload,
        withCredentials : true,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };

    return axios(config)
};

//-----Get Paginated Tech Companies-----
let getAllTc = (pageIndex, pageSize) => {
    const config = {
        method : "GET",
        url : tcService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };
    return axios(config);
};
//-----update Tech Companies
let update = (payload , id) =>{ 
    const config = {
      method : "PUT",
      url : tcService.endpoint + "/" + id,
      data : payload,
      crossdomain : true,
      headers : {"Content-Type" : "application/json"}
    };
    return axios(config).then(function (response) {
      console.log("Edit Tech-Company", response);
      payload.friendId = id;
      return payload;
    });
  };

  //-----Get Tech companies By Id-----
let getById = (id) =>{
    const config = {
        method:"GET",
        url : tcService.endpoint + "/" + id,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };
    return axios(config)
    .then(function (data) {
      console.log(data);
      return data
    })
    .catch(function (data){
      console.warn(data)
    });
  };

export default {getById , getAllTc, addTc , update}