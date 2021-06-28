import axios from "axios";

const addFriends = (payload) => {
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/friends",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };

const getFriends = (payload) => {
    const config = {
      method: "GET",
      url: "https://api.remotebootcamp.dev/api/friends",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };
  
    const updateFriend = (payload) => {
      const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/{id}",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };
    
      return axios(config);
  };

  export {getFriends, addFriends, updateFriend }