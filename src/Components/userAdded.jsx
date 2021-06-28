import React from "react";
import axios from "axios";

let payload = {
  email: "danielm1013@gmail.com",
  password: "!QAZ2wsx",
  tenantId: "U01N8MYLM8C",
};

let userLogin = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export default { userLogin };
