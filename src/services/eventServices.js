// import axios from "axios";

// // {
// //     "metaData": {
// //       "dateStart": "2021-04-20T03:08:09.445Z",
// //       "dateEnd": "2021-04-20T03:08:09.445Z",
// //       "location": {
// //         "latitude": 38.9042154626114,
// //         "longitude": -77.26104428894806,
// //         "zipCode": "22180",
// //         "address": "227 Maple Ave E, Vienna, VA"
// //       }
// //     },
// //     "name": "KIM RICHEY",
// //     "headline": "Night 1 (Indoors and Distanced)",
// //     "description": "string",
// //     "summary": "The Songs of Glimmer tour",
// //     "slug": "Huh?",
// //     "statusId": "Active"
// //   }
// apiHandler.addEvent = (event) => {
//     const config = {
//         method: "POST",
//         url: `${apiHandler.userEndpoint}events`,
//         data: event,
//         crossdomain: true,
//         headers: { "Content-Type": "application/json" }
//     };

//     return axios(config); 
// }