import React from "react";
//import CompaniesAddUpdate from "./CompaniesAddUpdate";
import { toast } from "react-toastify";
//import * as companiesService from "../services/companiesService";
//import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.css";
//import CompaniesList from "../components/CompaniesList";

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      formData: "",
    };
  }

  // -----POST PAYLOAD-----
  // {
  //   "name": "Amazon",
  //   "profile": "Online Retail",
  //   "summary": "Provides online ordering services",
  //   "headline": "Amazon Shopping",
  //   "contactInformation": "fake_email@fake_amazon.com",
  //   "slug": "jfoiwmicomqc",
  //   "statusId": "1",
  //   "images": [
  //     {
  //       "imageTypeId": 1,
  //       "imageUrl": "https://www.amazon.com/ref=nav_logo"
  //     }
  //   ],
  //   "urls": [
  //     "string"
  //   ],
  //   "tags": [
  //     "string"
  //   ],
  //   "friendIds": [
  //     0
  //   ]
  // }


  toastSuccess = () => {
    toast.success("Success", {
      closeOnClick: true,
      position: "top-right",
    });
  };
  toastError = (number) => {
    toast.error(`Error, index is ${number}`, {
      closeOnClick: true,
      position: "top-center",
    });
  };
  toastErrorDelete = () => {
    toast.error("That company is not in the companies array.", {
      closeOnClick: true,
      position: "top-left",
    });
  };

  render() {
    return <React.Fragment>Test</React.Fragment>;
  }
}

export default Companies;

// get companies response body

// {
//   "item": {
//     "pageIndex": 0,
//     "pageSize": 10,
//     "totalCount": 6,
//     "totalPages": 1,
//     "pagedItems": [
//       {
//         "id": 20727,
//         "slug": "slug7",
//         "statusId": "Active",
//         "name": "Softwhere",
//         "headline": "Codex shopping",
//         "profile": "Software Company",
//         "summary": "Provides Application Software",
//         "entityTypeId": 2,
//         "contactInformation": {
//           "id": 433,
//           "entityId": 20727,
//           "data": "fake_e-mail@fake.com",
//           "dateCreated": "2021-02-04T18:31:02.38Z",
//           "dateModified": "2021-02-04T18:31:02.38Z"
//         },
//         "images": [
//           {
//             "id": 8789,
//             "entityId": 20727,
//             "imageTypeId": "Seo",
//             "imageUrl": "https://dribbble.com/shots/14846041-Codex-Logo"
//           }
//         ],
//         "urls": [
//           {
//             "id": 596,
//             "entityId": 20727,
//             "url": "string"
//           }
//         ],
//         "friends": null,
//         "tags": [
//           {
//             "id": 11,
//             "entityId": 20727,
//             "tagName": "string"
//           }
//         ],
//         "dateCreated": "2021-02-04T18:31:02.3333333",
//         "dateModified": "2021-02-04T18:31:02.3333333"
//       },
//       {
//         "id": 20724,
//         "slug": "slug6",
//         "statusId": "Active",
//         "name": "Codex",
//         "headline": "Codex shopping",
//         "profile": "Online Retail",
//         "summary": "Provides online ordering services",
//         "entityTypeId": 2,
//         "contactInformation": {
//           "id": 432,
//           "entityId": 20724,
//           "data": "fake_e-mail@fake.com",
//           "dateCreated": "2021-02-04T18:29:33.2433333Z",
//           "dateModified": "2021-02-04T18:29:33.2433333Z"
//         },
//         "images": [
//           {
//             "id": 8788,
//             "entityId": 20724,
//             "imageTypeId": "Seo",
//             "imageUrl": "https://dribbble.com/shots/14846041-Codex-Logo"
//           }
//         ],
//         "urls": [
//           {
//             "id": 595,
//             "entityId": 20724,
//             "url": "string"
//           }
//         ],
//         "friends": null,
//         "tags": [
//           {
//             "id": 11,
//             "entityId": 20724,
//             "tagName": "string"
//           }
//         ],
//         "dateCreated": "2021-02-04T18:29:33.2133333",
//         "dateModified": "2021-02-04T18:29:33.2133333"
//       },
//       {
//         "id": 20723,
//         "slug": "slug5",
//         "statusId": "Active",
//         "name": "Procode",
//         "headline": "procode shopping",
//         "profile": "Online Retail",
//         "summary": "Provides online ordering services",
//         "entityTypeId": 2,
//         "contactInformation": {
//           "id": 431,
//           "entityId": 20723,
//           "data": "fake_e-mail@fake.com",
//           "dateCreated": "2021-02-04T18:25:33.61Z",
//           "dateModified": "2021-02-04T18:25:33.61Z"
//         },
//         "images": [
//           {
//             "id": 8787,
//             "entityId": 20723,
//             "imageTypeId": "Seo",
//             "imageUrl": "https://dribbble.com/shots/11421692-Procode-Logo-Animation"
//           }
//         ],
//         "urls": [
//           {
//             "id": 594,
//             "entityId": 20723,
//             "url": "string"
//           }
//         ],
//         "friends": null,
//         "tags": [
//           {
//             "id": 11,
//             "entityId": 20723,
//             "tagName": "string"
//           }
//         ],
//         "dateCreated": "2021-02-04T18:25:33.58",
//         "dateModified": "2021-02-04T18:25:33.58"
//       },
//       {
//         "id": 20717,
//         "slug": "slug4",
//         "statusId": "Active",
//         "name": "ITONE",
//         "headline": "Amazon Shopping",
//         "profile": "Online Retail",
//         "summary": "Provides online ordering services",
//         "entityTypeId": 2,
//         "contactInformation": {
//           "id": 430,
//           "entityId": 20717,
//           "data": "fake_email@fake_itone.com",
//           "dateCreated": "2021-02-04T18:02:14.04Z",
//           "dateModified": "2021-02-04T18:02:14.04Z"
//         },
//         "images": [
//           {
//             "id": 8785,
//             "entityId": 20717,
//             "imageTypeId": "Seo",
//             "imageUrl": "https://dribbble.com/shots/11891575-ITONE-Logo"
//           }
//         ],
//         "urls": [
//           {
//             "id": 593,
//             "entityId": 20717,
//             "url": "string"
//           }
//         ],
//         "friends": null,
//         "tags": [
//           {
//             "id": 11,
//             "entityId": 20717,
//             "tagName": "string"
//           }
//         ],
//         "dateCreated": "2021-02-04T18:02:13.9933333",
//         "dateModified": "2021-02-04T18:02:13.9933333"
//       },
//       {
//         "id": 20713,
//         "slug": "slug602",
//         "statusId": "Active",
//         "name": "ITONE",
//         "headline": "string",
//         "profile": "string",
//         "summary": "string",
//         "entityTypeId": 2,
//         "contactInformation": null,
//         "images": null,
//         "urls": null,
//         "friends": null,
//         "tags": null,
//         "dateCreated": "2021-02-04T17:58:46.44",
//         "dateModified": "2021-02-04T17:58:46.44"
//       },
//       {
//         "id": 20711,
//         "slug": "slug3",
//         "statusId": "Active",
//         "name": "Amazon",
//         "headline": "Amazon Shopping",
//         "profile": "Online Retail",
//         "summary": "Provides online ordering services",
//         "entityTypeId": 2,
//         "contactInformation": {
//           "id": 429,
//           "entityId": 20711,
//           "data": "fake_email@fake_amazon.com",
//           "dateCreated": "2021-02-04T14:49:05.81Z",
//           "dateModified": "2021-02-04T14:49:05.81Z"
//         },
//         "images": [
//           {
//             "id": 8783,
//             "entityId": 20711,
//             "imageTypeId": "Seo",
//             "imageUrl": "https://www.amazon.com/ref=nav_logo"
//           }
//         ],
//         "urls": [
//           {
//             "id": 592,
//             "entityId": 20711,
//             "url": "string"
//           }
//         ],
//         "friends": null,
//         "tags": [
//           {
//             "id": 11,
//             "entityId": 20711,
//             "tagName": "string"
//           }
//         ],
//         "dateCreated": "2021-02-04T14:49:05.7766667",
//         "dateModified": "2021-02-04T14:49:05.7766667"
//       }
//     ],
//     "hasPreviousPage": false,
//     "hasNextPage": false
//   },
//   "isSuccessful": true,
//   "transactionId": "a004ea6c-f39d-4a68-aa7c-54d079dcdc5f"
// }
// Response headers
