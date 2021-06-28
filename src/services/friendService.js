import axios from "axios";

let addFriend = (payload, onSuccess, onError) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/friends",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getFriends = (pageIndex, pageSize) => {

    const config = {
      method: "GET",
      url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10",
      data: pageIndex, pageSize,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let deleteFriend = (id) => {
    const config = {
      method: "DELETE",
      url: "https://api.remotebootcamp.dev/api/friends" + "/" + id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config)
      
  };

  export { addFriend, getFriends, deleteFriend  };