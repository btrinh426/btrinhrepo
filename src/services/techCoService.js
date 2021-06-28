import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

const endpoint = "https://api.remotebootcamp.dev/api/techcompanies";
 
const add = (payload) => {
    console.log("... @ techCoService.add is executing ...");
  
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config)
    //   .then(function (data) {
    //     return { data, payload };
    //   });
  };

  const getById = (id) => {    // XXX UNTESTED
    console.log("... @ techCoService.getById is executing ... ", id);
  
    const config = {
      method: "GET",
      url: endpoint + "/" + id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  };
  
const getByPage = (pageIndex, pageSize) => {
    console.log("... @ techCoService.getById is executing ... ");
  
    let compositeEndPt = endpoint +
      `?pageIndex=${pageIndex}&pageSize=${pageSize}`;// ${}
  
    const config = {
      method: "GET",
      url: compositeEndPt,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config);
  };
  
const update = (id, payload) => {
    console.log("... @ techCoService.update is executing ...");
  
    const config = {
      method: "PUT",
      url: endpoint + "/" + id,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    // return axios(config)
    //   .then(function (data) {
    //     return { data, id, payload };
    //   });
  };

export  { add, getById, getByPage, update };

/**
 * 
 * Request URL          POST
https://api.remotebootcamp.dev/api/techcompanies
 
{
  "errors": [
    "The Name field is required.",
    "The Profile field is required.",
    "The Summary field is required.",
    "The Headline field is required.",
    "The ContactInformation field is required."
  ],
  "isSuccessful": false,
  "transactionId": "8c091f00-1bf4-4110-856b-4be32712c845"
}

{
  "errors": [
    "Procedure or function 'Entities_Insert' expects parameter '@Slug', which was not supplied."
  ],
  "isSuccessful": false,
  "transactionId": "f7db612d-171f-461d-8ac0-1fc0890f3652"
}

===============================================

{
  "name": "string",
  "profile": "string",
  "summary": "string",
  "headline": "string",
  "contactInformation": "string",
  "slug": "be the best of the best of the best",
  "statusId": "Active",
}
{
  "item": 18363,
  "isSuccessful": true,
  "transactionId": "6a500c30-3ee8-4238-9ddf-319aad64c4df"
}
================================================
{
  "name": "string",
  "profile": "string",
  "summary": "string",
  "headline": "string",
  "contactInformation": "string",
  "slug": "string",
  "statusId": "NotSet",
  "images": [
    {
      "imageTypeId": 0,
      "imageUrl": "string"
    }
  ],
  "urls": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "friendIds": [
    0
  ]
}

// ===================================================================

{
  "name": "Northrop Grumman",
  "profile": "Possible drives us at Northrop Grumman",
  "summary": "string",
  "headline": "Never stop exploring, always be challenged. Define Possible in your next career move at Northrop Grumman.",
  "contactInformation": "Northrop Grumman Corporation, 2980 Fairview Park Drive, Falls Church, VA 22042, 703-280-2900",
  "slug": "Everyone has a voice here, and it takes every one of us to make the impossible a reality 2",
  "statusId": "Active",
  "images": [
    {
      "imageTypeId": 1,
      "imageUrl": "https://www.northropgrumman.com/wp-content/uploads/2019/12/NGC-logo-white-on-clear.png"
    }
  ],
  "urls": [
    "https://snowman.academy/main.html", "https://www.northropgrumman.com/careers/","https://www.northropgrumman.com/"
  ],
  "tags": [
    "A Vision for Advanced Manufacturing"
  ],
  "friendIds": [
    7170
  ]
}
{
    "item": 18353,
    "isSuccessful": true,
    "transactionId": "f9bb32d7-b136-474a-be3b-4608d1ac20eb"
}
// ===================================================================
{
  "name": "Blue Air Training",
  "profile": "Contract Close Air Support",
  "summary": "JTAC Training",
  "headline": "Provide the highest quality Close Air Support (CAS) training",
  "contactInformation": "info@blueairtraining.com 1.888.BLUE.447 ext 4 11411 Southern Highlands Parkway, Ste 330 Las Vegas,Nevada 89141 USA",
  "slug": "To save American lives and to save the American taxpayer money",
  "statusId": "Active",
  "images": [
    {
      "imageTypeId": 1,
      "imageUrl": "https://blueairtraining.com/wp-content/uploads/2019/01/blue-air-training-web-logo.png"
    }
  ],
  "urls": [
    "https://snowman.academy/main.html", "https://blueairtraining.com/careers/","https://blueairtraining.com//"
  ],
  "tags": [
    "the World is your OP!"
  ],
  "friendIds": [
    7170
  ]
}
{
    "item": 18354,
    "isSuccessful": true,
    "transactionId": "7125baa6-8b4a-4e9a-bbda-6fac3ccd571c"
}
// ===================================================================
{
  "name": "Garmin",
  "profile": "Retail GPS nav and wearable tech",
  "summary": "GPS based systems for all areas of life",
  "headline": "We make products that are engineered on the inside for life on the outside",
  "contactInformation": "Phone: (913) 397-8200 1200 E. 151st St. Olathe, KS 66062-3426 Garmin.com",
  "slug": "We Fuel People's Passions",
  "statusId": "Active",
  "images": [
    {
      "imageTypeId": 1,
      "imageUrl": "https://www8.garmin.com/aboutGarmin/m/g/pt-salem.jpg"
    }
  ],
  "urls": [
    "https://snowman.academy/main.html", "https://careers-us.garmin.com/us/en","https://www.garmin.com/en-US/"
  ],
  "tags": [
    "GPS gear"
  ],
  "friendIds": [
    7170
  ]
}
{
    "item": 18353,
    "isSuccessful": true,
    "transactionId": "422fc51f-ca5f-4fcf-aa79-0ae97ee52487"
}
// ===================================================================

{
  "name": "Toptal",
  "profile": "Freelance talent on demand",
  "summary": "Toptal is an exclusive network of the top freelance software developers",
  "headline": "The world’s leading brands hire Toptal freelance talent, and so can you",
  "contactInformation": "+1.888.604.3188 support@toptal.com Toptal, LLC 548 Market St #36879 San Francisco, CA 94104",
  "slug": "Hire the Top 3% of Freelance Talent",
  "statusId": "Active",
  "images": [
    {
      "imageTypeId": 1,
      "imageUrl": "https://bs-uploads.toptal.io/blackfish-uploads/components/careers_page/life_at_toptal_section/card/content/image_file/image/380571/life_at_toptal_1-c4fde1aa595d66661610c4f015fc3498.png"
    }
  ],
  "urls": [
    "https://snowman.academy/main.html", "https://www.toptal.com/careers","https://www.toptal.com/"
  ],
  "tags": [
    "Hire the Top 3% of Freelance Talent"
  ],
  "friendIds": [
    7170
  ]
}
{
    "item": 18360,
    "isSuccessful": true,
    "transactionId": "ecf65544-f020-4d11-a24d-e203b30660f8"
}
=================================================================================
=================================================================================
get  by page

https://api.remotebootcamp.dev/api/techcompanies?pageIndex=0&pageSize=20


{
    "item": {
        "pageIndex": 0,
        "pageSize": 20,
        "totalCount": 9,
        "totalPages": 1,
        "pagedItems": [
            {
                "id": 18360,
                "slug": "Hire the Top 3% of Freelance Talent",
                "statusId": "Active",
                "name": "Toptal",
                "headline": "The world’s leading brands hire Toptal freelance talent, and so can you",
                "profile": "Freelance talent on demand",
                "summary": "Toptal is an exclusive network of the top freelance software developers",
                "entityTypeId": 2,
                "contactInformation": {
                    "id": 301,
                    "entityId": 18360,
                    "data": "+1.888.604.3188 support@toptal.com Toptal, LLC 548 Market St #36879 San Francisco, CA 94104",
                    "dateCreated": "2020-11-03T18:10:37.74Z",
                    "dateModified": "2020-11-03T18:10:37.74Z"
                },
                "images": [
                    {
                        "id": 6548,
                        "entityId": 18360,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://bs-uploads.toptal.io/blackfish-uploads/components/careers_page/life_at_toptal_section/card/content/image_file/image/380571/life_at_toptal_1-c4fde1aa595d66661610c4f015fc3498.png"
                    }
                ],
                "urls": [
                    {
                        "id": 397,
                        "entityId": 18360,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 398,
                        "entityId": 18360,
                        "url": "https://www.toptal.com/careers"
                    },
                    {
                        "id": 399,
                        "entityId": 18360,
                        "url": "https://www.toptal.com/"
                    }
                ],
                "friends": [
                    {
                        "id": 7170,
                        "bio": "victory over eagles 2",
                        "title": "baby pugda",
                        "summary": "soars 2",
                        "headline": "quiet",
                        "entityTypeId": 1,
                        "statusId": "Active",
                        "slug": "swift 2",
                        "skills": null,
                        "primaryImage": {
                            "id": 6316,
                            "entityId": 7170,
                            "imageTypeId": "Main",
                            "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                        },
                        "dateCreated": "2020-10-20T03:27:11.33",
                        "dateModified": "2020-10-24T03:45:23.2266667"
                    }
                ],
                "tags": [
                    {
                        "id": 150,
                        "entityId": 18360,
                        "tagName": "Hire the Top 3% of Freelance Talent"
                    }
                ],
                "dateCreated": "2020-11-03T18:10:37.66",
                "dateModified": "2020-11-03T18:10:37.66"
            },
            {
                "id": 18359,
                "slug": "100 Years of Innovation 3",
                "statusId": "Active",
                "name": "Cambia Health Solutions",
                "headline": "Person-focused from the very beginning",
                "profile": "Healthcare solutions",
                "summary": "Human-centered health care is our core",
                "entityTypeId": 2,
                "contactInformation": {
                    "id": 300,
                    "entityId": 18359,
                    "data": "100 SW Market St, Portland, OR 97201",
                    "dateCreated": "2020-11-03T18:03:36.4466667Z",
                    "dateModified": "2020-11-03T18:03:36.4466667Z"
                },
                "images": [
                    {
                        "id": 6544,
                        "entityId": 18359,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www.cambiahealth.com/themes/custom/cambia/svg/Cambia-Health-Solutions-Logo.svg"
                    }
                ],
                "urls": [
                    {
                        "id": 394,
                        "entityId": 18359,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 395,
                        "entityId": 18359,
                        "url": "https://cambiahealth.com/careers"
                    },
                    {
                        "id": 396,
                        "entityId": 18359,
                        "url": "https://www.cambiahealth.com/"
                    }
                ],
                "friends": [
                    {
                        "id": 7170,
                        "bio": "victory over eagles 2",
                        "title": "baby pugda",
                        "summary": "soars 2",
                        "headline": "quiet",
                        "entityTypeId": 1,
                        "statusId": "Active",
                        "slug": "swift 2",
                        "skills": null,
                        "primaryImage": {
                            "id": 6316,
                            "entityId": 7170,
                            "imageTypeId": "Main",
                            "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                        },
                        "dateCreated": "2020-10-20T03:27:11.33",
                        "dateModified": "2020-10-24T03:45:23.2266667"
                    }
                ],
                "tags": [
                    {
                        "id": 149,
                        "entityId": 18359,
                        "tagName": "Choose a career that makes a difference"
                    }
                ],
                "dateCreated": "2020-11-03T18:03:36.4",
                "dateModified": "2020-11-03T18:03:36.4"
            },
            {
                "id": 18358,
                "slug": "100 Years of Innovation 2",
                "statusId": "Active",
                "name": "Cambia Health Solutions",
                "headline": "Person-focused from the very beginning",
                "profile": "Healthcare solutions",
                "summary": "Human-centered health care is at our core",
                "entityTypeId": 2,
                "contactInformation": null,
                "images": [
                    {
                        "id": 6542,
                        "entityId": 18358,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www.cambiahealth.com/themes/custom/cambia/svg/Cambia-Health-Solutions-Logo.svg"
                    }
                ],
                "urls": [
                    {
                        "id": 391,
                        "entityId": 18358,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 392,
                        "entityId": 18358,
                        "url": "https://cambiahealth.com/careers"
                    },
                    {
                        "id": 393,
                        "entityId": 18358,
                        "url": "https://www.cambiahealth.com/"
                    }
                ],
                "friends": null,
                "tags": null,
                "dateCreated": "2020-11-03T17:59:06.3233333",
                "dateModified": "2020-11-03T17:59:06.3233333"
            },
            {
                "id": 18356,
                "slug": "100 Years of Innovation",
                "statusId": "Active",
                "name": "Cambia Health Solutions",
                "headline": "Person-focused from the very beginnin",
                "profile": "Healthcare solutions",
                "summary": "Human-centered health care is at our core",
                "entityTypeId": 2,
                "contactInformation": null,
                "images": [
                    {
                        "id": 6541,
                        "entityId": 18356,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www.cambiahealth.com/themes/custom/cambia/svg/Cambia-Health-Solutions-Logo.svg"
                    }
                ],
                "urls": [
                    {
                        "id": 388,
                        "entityId": 18356,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 389,
                        "entityId": 18356,
                        "url": "https://cambiahealth.com/careers"
                    },
                    {
                        "id": 390,
                        "entityId": 18356,
                        "url": "https://www.cambiahealth.com/"
                    }
                ],
                "friends": null,
                "tags": null,
                "dateCreated": "2020-11-03T17:58:07.7866667",
                "dateModified": "2020-11-03T17:58:07.7866667"
            },
            {
                "id": 18355,
                "slug": "We Fuel People's Passions",
                "statusId": "Active",
                "name": "Garmin",
                "headline": "We make products that are engineered on the inside for life on the outside",
                "profile": "Retail GPS nav and wearable tech",
                "summary": "GPS based systems for all areas of life",
                "entityTypeId": 2,
                "contactInformation": {
                    "id": 299,
                    "entityId": 18355,
                    "data": "Phone: (913) 397-8200 1200 E. 151st St. Olathe, KS 66062-3426 Garmin.com",
                    "dateCreated": "2020-11-03T17:51:19.55Z",
                    "dateModified": "2020-11-03T17:51:19.55Z"
                },
                "images": [
                    {
                        "id": 6540,
                        "entityId": 18355,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www8.garmin.com/aboutGarmin/m/g/pt-salem.jpg"
                    }
                ],
                "urls": [
                    {
                        "id": 385,
                        "entityId": 18355,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 386,
                        "entityId": 18355,
                        "url": "https://careers-us.garmin.com/us/en"
                    },
                    {
                        "id": 387,
                        "entityId": 18355,
                        "url": "https://www.garmin.com/en-US/"
                    }
                ],
                "friends": [
                    {
                        "id": 7170,
                        "bio": "victory over eagles 2",
                        "title": "baby pugda",
                        "summary": "soars 2",
                        "headline": "quiet",
                        "entityTypeId": 1,
                        "statusId": "Active",
                        "slug": "swift 2",
                        "skills": null,
                        "primaryImage": {
                            "id": 6316,
                            "entityId": 7170,
                            "imageTypeId": "Main",
                            "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                        },
                        "dateCreated": "2020-10-20T03:27:11.33",
                        "dateModified": "2020-10-24T03:45:23.2266667"
                    }
                ],
                "tags": [
                    {
                        "id": 146,
                        "entityId": 18355,
                        "tagName": "GPS gear"
                    }
                ],
                "dateCreated": "2020-11-03T17:51:19.5033333",
                "dateModified": "2020-11-03T17:51:19.5033333"
            },
            {
                "id": 18354,
                "slug": "To save American lives and to save the American taxpayer money",
                "statusId": "Active",
                "name": "Blue Air Training",
                "headline": "Provide the highest quality Close Air Support (CAS) training",
                "profile": "Contract Close Air Support",
                "summary": "JTAC Training",
                "entityTypeId": 2,
                "contactInformation": {
                    "id": 298,
                    "entityId": 18354,
                    "data": "info@blueairtraining.com 1.888.BLUE.447 ext 4 11411 Southern Highlands Parkway, Ste 330 Las Vegas,Nevada 89141 USA",
                    "dateCreated": "2020-11-03T17:42:21.5333333Z",
                    "dateModified": "2020-11-03T17:42:21.5333333Z"
                },
                "images": [
                    {
                        "id": 6539,
                        "entityId": 18354,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://blueairtraining.com/wp-content/uploads/2019/01/blue-air-training-web-logo.png"
                    }
                ],
                "urls": [
                    {
                        "id": 382,
                        "entityId": 18354,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 383,
                        "entityId": 18354,
                        "url": "https://blueairtraining.com/careers/"
                    },
                    {
                        "id": 384,
                        "entityId": 18354,
                        "url": "https://blueairtraining.com//"
                    }
                ],
                "friends": [
                    {
                        "id": 7170,
                        "bio": "victory over eagles 2",
                        "title": "baby pugda",
                        "summary": "soars 2",
                        "headline": "quiet",
                        "entityTypeId": 1,
                        "statusId": "Active",
                        "slug": "swift 2",
                        "skills": null,
                        "primaryImage": {
                            "id": 6316,
                            "entityId": 7170,
                            "imageTypeId": "Main",
                            "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                        },
                        "dateCreated": "2020-10-20T03:27:11.33",
                        "dateModified": "2020-10-24T03:45:23.2266667"
                    }
                ],
                "tags": [
                    {
                        "id": 145,
                        "entityId": 18354,
                        "tagName": "the World is your OP!"
                    }
                ],
                "dateCreated": "2020-11-03T17:42:21.49",
                "dateModified": "2020-11-03T17:42:21.49"
            },
            {
                "id": 18353,
                "slug": "Everyone has a voice here, and it takes every one of us to make the impossible a reality 2",
                "statusId": "Active",
                "name": "Northrop Grumman",
                "headline": "Never stop exploring, always be challenged. Define Possible in your next career",
                "profile": "Possible drives us at Northrop Grumman",
                "summary": "string",
                "entityTypeId": 2,
                "contactInformation": {
                    "id": 297,
                    "entityId": 18353,
                    "data": "Northrop Grumman Corporation, 2980 Fairview Park Drive, Falls Church, VA 22042, 703-280-2900",
                    "dateCreated": "2020-11-03T17:30:13.5966667Z",
                    "dateModified": "2020-11-03T17:30:13.5966667Z"
                },
                "images": [
                    {
                        "id": 6538,
                        "entityId": 18353,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www.northropgrumman.com/wp-content/uploads/2019/12/NGC-logo-white-on-clear.png"
                    }
                ],
                "urls": [
                    {
                        "id": 379,
                        "entityId": 18353,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 380,
                        "entityId": 18353,
                        "url": "https://www.northropgrumman.com/careers/"
                    },
                    {
                        "id": 381,
                        "entityId": 18353,
                        "url": "https://www.northropgrumman.com/"
                    }
                ],
                "friends": [
                    {
                        "id": 7170,
                        "bio": "victory over eagles 2",
                        "title": "baby pugda",
                        "summary": "soars 2",
                        "headline": "quiet",
                        "entityTypeId": 1,
                        "statusId": "Active",
                        "slug": "swift 2",
                        "skills": null,
                        "primaryImage": {
                            "id": 6316,
                            "entityId": 7170,
                            "imageTypeId": "Main",
                            "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                        },
                        "dateCreated": "2020-10-20T03:27:11.33",
                        "dateModified": "2020-10-24T03:45:23.2266667"
                    }
                ],
                "tags": [
                    {
                        "id": 144,
                        "entityId": 18353,
                        "tagName": "A Vision for Advanced Manufacturing"
                    }
                ],
                "dateCreated": "2020-11-03T17:30:13.5333333",
                "dateModified": "2020-11-03T17:30:13.5333333"
            },
            {
                "id": 18352,
                "slug": "Everyone has a voice here, and it takes every one of us to make the impossible a reality 1",
                "statusId": "Active",
                "name": "Northrop Grumman",
                "headline": "Never stop exploring, always be challenged. Define Possible in your next career",
                "profile": "Possible drives us at Northrop Grumman",
                "summary": "string",
                "entityTypeId": 2,
                "contactInformation": null,
                "images": [
                    {
                        "id": 6537,
                        "entityId": 18352,
                        "imageTypeId": "Seo",
                        "imageUrl": "https://www.northropgrumman.com/wp-content/uploads/2019/12/NGC-logo-white-on-clear.png"
                    }
                ],
                "urls": [
                    {
                        "id": 376,
                        "entityId": 18352,
                        "url": "https://snowman.academy/main.html"
                    },
                    {
                        "id": 377,
                        "entityId": 18352,
                        "url": "https://www.northropgrumman.com/careers/"
                    },
                    {
                        "id": 378,
                        "entityId": 18352,
                        "url": "https://www.northropgrumman.com/"
                    }
                ],
                "friends": null,
                "tags": null,
                "dateCreated": "2020-11-03T17:29:35.3433333",
                "dateModified": "2020-11-03T17:29:35.3433333"
            },
            {
                "id": 18350,
                "slug": "Everyone has a voice here, and it takes every one of us to make the impossible a reality",
                "statusId": "Active",
                "name": "Northrop Grumman",
                "headline": "Never stop exploring, always be challenged. Define Possible in your next career",
                "profile": "Possible drives us at Northrop Grumman",
                "summary": "string",
                "entityTypeId": 2,
                "contactInformation": null,
                "images": null,
                "urls": null,
                "friends": null,
                "tags": null,
                "dateCreated": "2020-11-03T17:28:22.8",
                "dateModified": "2020-11-03T17:28:22.8"
            }
        ],
        "hasPreviousPage": false,
        "hasNextPage": false
    },
    "isSuccessful": true,
    "transactionId": "63aa852d-9369-4858-a790-46269d1ec49d"
}


=================================================================================
=================================================================================
GET SEARCH
https://api.remotebootcamp.dev/api/techcompanies/search?pageIndex=0&pageSize=10&q=Cambia
{
  "item": {
    "pageIndex": 0,
    "pageSize": 10,
    "totalCount": 3,
    "totalPages": 1,
    "pagedItems": [
      {
        "id": 18359,
        "slug": "100 Years of Innovation 3",
        "statusId": "Active",
        "name": "Cambia Health Solutions",
        "headline": "Person-focused from the very beginning",
        "profile": "Healthcare solutions",
        "summary": "Human-centered health care is our core",
        "entityTypeId": 2,
        "contactInformation": null,
        "images": null,
        "urls": null,
        "friends": null,
        "tags": null,
        "dateCreated": "2020-11-03T18:03:36.4",
        "dateModified": "2020-11-03T18:03:36.4"
      },
      {
        "id": 18358,
        "slug": "100 Years of Innovation 2",
        "statusId": "Active",
        "name": "Cambia Health Solutions",
        "headline": "Person-focused from the very beginning",
        "profile": "Healthcare solutions",
        "summary": "Human-centered health care is at our core",
        "entityTypeId": 2,
        "contactInformation": null,
        "images": null,
        "urls": null,
        "friends": null,
        "tags": null,
        "dateCreated": "2020-11-03T17:59:06.3233333",
        "dateModified": "2020-11-03T17:59:06.3233333"
      },
      {
        "id": 18356,
        "slug": "100 Years of Innovation",
        "statusId": "Active",
        "name": "Cambia Health Solutions",
        "headline": "Person-focused from the very beginnin",
        "profile": "Healthcare solutions",
        "summary": "Human-centered health care is at our core",
        "entityTypeId": 2,
        "contactInformation": null,
        "images": null,
        "urls": null,
        "friends": null,
        "tags": null,
        "dateCreated": "2020-11-03T17:58:07.7866667",
        "dateModified": "2020-11-03T17:58:07.7866667"
      }
    ],
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "isSuccessful": true,
  "transactionId": "41e65e39-feaa-4888-9a35-7ee922767aeb"
}
 */