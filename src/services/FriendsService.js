import axios from "axios"

let friendsService = {
    endpoint : "https://api.remotebootcamp.dev/api/friends"
  }
//-----add Friend-----
let addFriend = (payload) =>
{
    const config ={
    method : "POST",
    url : friendsService.endpoint,
    data : payload,
    withCredentials : true,
    crossdomain : true,
    headers : {"Content-Type" : "application/json"}
    }

    return axios(config)
};

//-----get Paginated Friends-----
let getAllFriends = (payload) => {

    const config = {
        method : "GET",
        url : friendsService.endpoint + "?pageIndex=0&pageSize=3",
        data : payload,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"} 
    };
    return axios(config);
};
//-----Update friends-----
let update = (payload , id) =>{
  
    const config = {
      method : "PUT",
      url : friendsService.endpoint + "/" + id,
      data : payload,
      crossdomain : true,
      headers : {"Content-Type" : "application/json"}
    };
    return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
  }
//-----get Friends By Id-----
let getById = (id) =>{
    const config = {
        method:"GET",
        url : friendsService.endpoint + `/${id}`,
        crossdomain : true,
        headers : {"Content-Type" : "application/json"}
    };
    return axios(config)
  }
//-----SearchFriends-----
  let searchFriends = (pageIndex, pageSize, searchResult) => {
    const config = {
      method: "GET",
      url: friendsService.endpoint +
        `/search?pageIndex=${pageIndex}&pageSize=${pageSize}` +
        "&q=" +
        searchResult,
      // data: headline,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config)
      .then(function (data) {
        console.log(data);
        return data;
      })
      .catch(function (data) {
        console.warn(data);
      });
  };

export default {addFriend , getAllFriends , update ,getById , searchFriends}