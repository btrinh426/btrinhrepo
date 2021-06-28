import React from "react";

const getPresidents = (payload) => {

    const config = {
      method: "POST",
      url: endpoint + "/login",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };


export {}