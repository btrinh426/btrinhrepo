import axios from "axios";

const sabioEndpoint = "https://localhost:50001/api/events";

let add = (payload) => {
  const config = {
    method: "POST",
    url: sabioEndpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getAll = (index, size) => {
  const config = {
    method: "GET",
    url: sabioEndpoint + `/paginate?pageIndex=${index}&pageSize=${size}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let edit = (id, payload) => {
  const config = {
    method: "PUT",
    url: sabioEndpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((res) => {
    return payload;
  });
};

let getByDate = (index, size, dateStart, dateEnd) => {
  const config = {
    method: "GET",
    url:
      sabioEndpoint +
      `/search?pageIndex=${index}&pageSize=${size}&eventStartDate=${dateStart}&eventEndDate=${dateEnd}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getByLocation = (lat, lng, radius) => {
  const config = {
    method: "GET",
    url:
      sabioEndpoint +
      `/search/geo?latitude=${lat}&longitude=${lng}&radius=${radius}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { add, getAll, edit, getByDate, getByLocation };
