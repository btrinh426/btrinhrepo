import axios from "axios";

let postForm = (payload) => {
    console.log("Successfully added friends: ", payload)
  
    const config = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

  let getUsers = () => {
    console.log("Successfully added friends: ")
  
    const config = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

export { postForm, getUsers };

