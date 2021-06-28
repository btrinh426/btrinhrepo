import axios from "axios";

const endpoint= "https://api.remotebootcamp.dev/api/friends/"

let addFriend = (payload) => {
  console.log("Successfully added friends: ", payload)

  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

let getFriends = (pageIndex, pageSize) => {
  console.log("Successfully loaded friends!");

    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

  let editFriend = (payload, id) => {
    console.log("Successfully edited friends: " + id);

    const config = {
      method: "PUT",
      url: endpoint + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

  let currentFriendWithId = (data, id) => {
    console.log("Welcome with id:", id);

    const config = {
      method: "GET",
      url: endpoint + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(()=> data)
  };

  let deleteFriend = (id) => {
    console.log("Deleted with id:", id);

    const config = {
      method: "DELETE",
      url: endpoint + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

  let searchFriend = (query, pageIndex, pageSize) => {
    console.log("Search results are: ", query);

    const config = {
      method: "GET",
      url: endpoint + `search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config)
  };

export { addFriend, getFriends, editFriend, currentFriendWithId, deleteFriend, searchFriend };