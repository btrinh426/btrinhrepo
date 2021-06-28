import axios from "axios";

let userServices = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
};

userServices.login = payload => {

    const config ={
      method: "POST",
      url: userServices.endpoint + "/login",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    
    return axios(config);
    
}

  userServices.register = (payload) => {
    const config = {
        method: "POST",
        url: userServices.endpoint + "/register",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
  }
  
  userServices.currentUser = () => {
    const config = {
      method: "GET",
      url: userServices.endpoint + "/login/6415/maurice/U01TY0VT466",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config)
  }

  userServices.logout = () => {
    const config = {
      method: "GET",
      url: userServices.endpoint + "/logout",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    }

    return axios(config)
  }

  userServices.userId = (id) => {
    const config = {
      method: "GET",
      url: userServices.endpoint + "/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    }

    return axios(config)
  }

  export default userServices