import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/friends/";

export const createFriend = (payload) => {

    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  export const getFriends = () => {

    const config = {
        method: "GET",
        url: endpoint + "?pageIndex=0&pageSize=5",
        withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
      
  };

  export const updateFriend = (id,payload) => {

    const config = {
        method: "PUT",
        url: endpoint + id,
        data: payload,
        withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
      
  };

  export const removeFriend = (id) => {

    const config = {
        method: "DELETE",
        url: endpoint + id,
        withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
      
  };

  export const getFriendById = (id) => {

    const config = {
        method: "GET",
        url: endpoint + id,
        withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
      
  };


  export default { createFriend, getFriends, updateFriend, getFriendById };
  

