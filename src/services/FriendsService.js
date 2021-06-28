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

//-----Get Paginated Friends-----
let getAllFriends = (pageIndex, pageSize) => {

    const config = {
        method : "GET",
        url : friendsService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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
    return axios(config).then(function (response) {
      console.log("Edit Friend", response);
      payload.friendId = id;
      return payload;
    });
  };
//-----Get Friends By Id-----
let getById = (id) =>{
    const config = {
        method:"GET",
        url : friendsService.endpoint + "/" + id,
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
//-----Delete Friend-----
  let deleteFriend = (id) => {
    const config = {
      method : "DELETE",
      url : friendsService.endpoint + "/" + id,
      crossdomain : true,
      headers : {"Content-Type" : "application/json"}
    }
    return axios(config).then(function (response) {
      console.log("Delete Friend", response);
      return id;
    });
  }
//-----SearchFriends-----
  let searchFriends = (pageIndex, pageSize, searchResult) => {
    const config = {
      method: "GET",
      url: friendsService.endpoint +
        `/search?pageIndex=${pageIndex}&pageSize=${pageSize}` +
        `&q=${searchResult}`,
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




export default {addFriend , getAllFriends , update ,getById , deleteFriend ,searchFriends}