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
      url: userServices.endpoint + "/current",
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJTYWJpby5XZWIuQ29yZSIsIm5hbWVpZCI6IjY0MTUiLCJ1bmlxdWVfbmFtZSI6Ik1hdXJpY2UiLCJTYWJpby5UZW5hbnRJZCI6IlUwMVRZMFZUNDY2IiwibmJmIjoxNjE5ODI4NTM5LCJleHAiOjE2MjE2NDI5MzksImlhdCI6MTYxOTgyODUzOSwiaXNzIjoiYXBpLnJlbW90ZWJvb3RjYW1wLmRldiIsImF1ZCI6ImFwaS5yZW1vdGVib290Y2FtcC5kZXYifQ.LWWS1ZwIEybNNCyoWexqlnYGpCGLT-iCMhFWVChsF3I", 
        "Content-Type": "application/json"
      }
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