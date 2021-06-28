import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/friends"

let addFriend = (payload, onSuccess, onError) => {

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

  let getFriends = (pageIndex, pageSize) => {

    const config = {
      method: "GET",
      url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      data: pageIndex, pageSize,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getFriendById = (id, payload) => {

    const config = {
      method: "GET",
      url: endpoint + "/" + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let editFriend = (payload, id) => {
    const config = {
      method: "PUT",
      url: endpoint + "/" + id,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);   
  };

  let deleteFriend = (id) => {
    const config = {
      method: "DELETE",
      url: endpoint + "/" + id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config)   
  };

  export { addFriend, getFriends, getFriendById, deleteFriend, editFriend };