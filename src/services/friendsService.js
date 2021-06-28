import axios from "axios";

var friendsService = {
  endpoint: "https://localhost:50001/api/friends",
};
var add = (payload) => {
    const config = {
      method: "POST",
      url: friendsService.endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config);
  };
var getAll = (pageIndex, pageSize) => {
  pageIndex = 0;
  pageSize = 10;
  const config = {
    method: "GET",
    url: friendsService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
var updateById = (id) => {
  id = 4568;
  let payload = {
    id: 12345,
    title: "Mr.",
    bio: "Just a great guy",
    summary: "the greatest",
    headline: "Meet the greatest",
    slug: "the greatest",
    statusId: "4321",
    primaryImage: "https://www.w3schools.com/w3css/img_avatar3.png"
};
  const config = {
    method: "PUT",
    url: friendsService.endpoint + '/' +id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
var getById = (id) => {
  id = 3468;
  const config = {
    method: "GET",
    url: friendsService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
var removeById = (id) => {
  id = 3468
  const config = {
    method: "DELETE",
    url: friendsService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
var search = (pageIndex, pageSize, q) => {
  pageIndex = 0;
  pageSize = 5;
  const config = {
    method: "GET",
    url: friendsService.endpoint + `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${q}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
var updateFriendById = (id, tenantid) => {
  id = 4568;
  tenantid = "NotSet";
  let payload = {
    id: 3468,
    bio: "Bio",
    title: "Bill Murray",
    summary: "Summary",
    headline: "Headline",
    entityTypeId: 1,
    statusId: "Active",
    slug: "asdfwef",
    skills: null,
    primaryImage: {
        id: 3864,
        entityId: 4568,
        imageTypeId: "Main",
        imageUrl: "https://via.placeholder.com/150"
    }
  };
  const config = {
    method: "PUT",
    url: friendsService.endpoint + '/' + id + '/' + tenantid,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
// works if parameter pageSize >= 1 on postman, otherwise gets 404 error:
// "System.Data.SqlClient.SqlException (0x80131904): The number of rows provided
// for a FETCH clause must be greater then zero.\r\n...
var getFriendBySlug = (slug) => {
  slug = "asdfwef";
  const config = {
    method: "GET",
    url: friendsService.endpoint + "/" + slug,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
export { add, getAll, updateById, getById, removeById, search, getFriendBySlug };
