import axios from "axios";

let friendService = {
    endpoint: "https://api.remotebootcamp.dev/api/friends"
  };

let friendList = (page) => {

    const config = {
      method: "get",
      url: friendService.endpoint+"?pageIndex="+ (page - 1) +"&pageSize=6",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let addFriend = (payload) => {

    const config = {
      method: "POST",
      url: friendService.endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getFriend =(id)=>{
    const config = {
        method: "GET",
        url: friendService.endpoint+"/"+id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);

  }

  let updateFriend =(id,payload)=>{
    const config = {
        method: "PUT",
        url: friendService.endpoint+"/"+id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
      return axios(config);


  }
  let deleteFriend =(id)=>{
    const config = {
        method: "Delete",
        url: friendService.endpoint+"/"+id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);

  }


  

  export {friendList,addFriend,getFriend,updateFriend,deleteFriend};