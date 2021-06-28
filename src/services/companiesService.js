

import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/techcompanies";

let getAll = (index, size) => {
    const config = {
        method: "GET",
        url: endpoint + `?pageIndex=${index}&pageSize=${size}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let add = (payload) => {
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  let updateById = (id, payload) => {
    const config = {
      method: "PUT",
      url: endpoint + "/" + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };


export { getAll, add,updateById };