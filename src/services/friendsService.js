import axios from "axios";

var friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};

var add = (payload) => {

// successful recent add:
//   {
//     "title": "Ms. Sharon Chung",
//     "bio": "blah blah blah",
//     "summary": "Great friend, good bartender",
//     "headline": "SF's greatest bartender!",
//     "primaryImage": "sharon1.jpeg",
//     "slug": "slug",
//     "status": 1,
//     "skills": "bartending, cooking, photography, fishing"
// }

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

  const config = {
    method: "GET",
    url: friendsService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    // url: friendsService.endpoint + '/' + pageIndex + '/' + pageSize,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};  


var updateById = (id, payload) => {

  const config = {
    method: "PUT",
    // url: friendsService.endpoint + `/id=${id}`,
    url: friendsService.endpoint + '/' +id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

var getById = (id) => {

  const config = {
    method: "GET",
    url: friendsService.endpoint + '/' +id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

var removeById = (id) => {

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

var update = (id, tenantid) => {

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
var getBySlug = (slug) => {
  
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

export { add, getAll, updateById, getById, removeById, search, update, getBySlug }; 

