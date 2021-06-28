import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

 const endpoint = "https://api.remotebootcamp.dev/api/users";

  // var aNewUser = {
  //   "firstName": "s5",
  //   "lastName": "snow",
  //   "email": "ssnow5@example.com",
  //   "password": "1234ABCabc--",
  //   "passwordConfirm": "1234ABCabc--",
  //   "avatarUrl": "https://api.remotebootcamp.dev/apihelp/rbclogo.png",
  //   "tenantId": "U019A93FF7A"
  // };
  

    // Why Arrow? KEEPS THIS scope as class scope when inside function
    // and prevents the need for funky binding  

 const login = (payload) => {
    console.log("... usersService.userLogin is executing ...", payload);
  
    const config = {
      method: "POST",
      url: endpoint + "/login",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);

    // .then(function (data) {
    //   console.log(data);
    // })
    // .catch(function (data) {
    //   console.warn(data);
    // });
  };
  
  const register = payload => {
    console.log("... usersService.register is executing ...", payload);
  
    const config = {
      method: "POST",
      url: endpoint + "/register",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  };
  
  const current = () => {
    console.log("... usersService.current is executing ... who am I logged in as? ");
  
    const config = {
      method: "GET",
      url: endpoint + "/current",
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config); 
  };
  
  const getById = idValue => {
    console.log("... usersService.getById is executing ... ", idValue);
  
    const config = {
      method: "GET",
      url: endpoint + "/" + idValue,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  
  };
  
  const getAllByPage = (pageIndex, pageSize) => {
    console.log("... usersService.getAllByPage is executing ... ");
  
    const pageGrab = `?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    // console.log(usersService.endpoint + pageGrab);
  
    const config = {
      method: "GET",
      url: endpoint + pageGrab,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  };
  
  const logout = () => {
    console.log("... usersService.logout is executing ... expecting 200");
  
    const config = {
      method: "GET",
      url: endpoint + "/logout",
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  }
  
export  { login, register, current, getById, getAllByPage ,logout  };

/**
 * 
 Swal.fire({
      title: "<strong>Request Error</strong>",
      icon: "error",
      // html:
      //   "This is an alert/b>, " +
      //   '<a href="//sweetalert2.github.io">links</a> ' +
      //   "Uhhhg",
      // title: "Are you sure?",
      text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.info("file deleted");
      }
    });
 */
