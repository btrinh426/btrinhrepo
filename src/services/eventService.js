import axios from "axios";

const eventEndpoint = "https://api.remotebootcamp.dev/api/events";

const addEvent = (event) => {
  // {
  //   "metaData": {
  //     "dateStart": "2021-02-19T01:52:51.410Z",
  //     "dateEnd": "2021-02-19T01:52:51.410Z",
  //     "location": {
  //       "latitude": 0,
  //       "longitude": 0,
  //       "zipCode": "string",
  //       "address": "string"
  //     }
  //   },
  //   "name": "string",
  //   "headline": "string",
  //   "description": "string",
  //   "summary": "string",
  //   "slug": "string",
  //   "statusId": "NotSet"
  // }

  const config = {
    method: "POST",
    url: `${eventEndpoint}`,
    data: event,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateEvent = (event) => {
  const config = {
    method: "PUT",
    url: `${eventEndpoint}/${event.id}`,
    data: event,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    response.event = event;
    return response;
  });
};

const getEventsByDateRange = (pageIndex, pageSize, dateStart, dateEnd) => {
  let targetUrl = `${eventEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`;
  // console.log(`Target URL to get events: ${targetUrl}`);
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getEventsNotStarted = (pageIndex, pageSize) => {
  let targetUrl = `${eventEndpoint}/feed?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  // console.log(`Target URL to get events: ${targetUrl}`);
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

// eventService.getEventsByRadius = (lat, lon, rad) => {
//   let targetUrl = `${eventEndpoint}/search/geo?latitude=${lat}&longitude=${lon}&radius=${rad}`;
//   const config = {
//     method: "GET",
//     url: targetUrl,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

// eventService.getEventBySlug = (eventSlug) => {
//   let targetUrl = `${eventEndpoint}/${eventSlug}`;
//   const config = {
//     method: "GET",
//     url: targetUrl,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

// eventService.getEventsStartingSoon = (pageIndex, pageSize, dateStart, dateEnd) => {
//   let targetUrl = `${eventEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`;
//   console.log(`Target URL to get events: ${targetUrl}`);
//   const config = {
//     method: "GET",
//     url: targetUrl,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };

//   return axios(config);
// };

export { eventEndpoint, addEvent, updateEvent, getEventsByDateRange, getEventsNotStarted };
