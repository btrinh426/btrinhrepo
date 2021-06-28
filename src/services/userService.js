import axios from "axios";

const userEndpoint = "https://api.remotebootcamp.dev/api/users"

const logIn = payload => {
    const config = {
        method: "POST",
        url: userEndpoint + "/login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };

    return axios(config);
}

const register = payload => {
    const config = {
        method: "POST",
        url: userEndpoint + "/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };

    return axios(config);
}

const currentUser = () => {
  console.log("getting current user...");

  const config = {
      method: "GET",
      url: userEndpoint + "/current",
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

const userById = (userId) => {
  console.log("getting user by id...");

  const config = {
      method: "GET",
      url: userEndpoint + "/" + userId,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

const logout = () => {
  console.log("logging out user...");

  const config = {
      method: "GET",
      url: userEndpoint + "/logout",
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

const email = () => {
  console.log("emailing user...");

  const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/emails",
      data: {
        "to": [
          "forfinn@gmail.com"
        ],
        "bcc": "sabiozac@example.com",
        "body": "Success! You've been registered at this website.",
        "name": "New User"
      },
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

export {logIn, register, currentUser, userById, logout, email};