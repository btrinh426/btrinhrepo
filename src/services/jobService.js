import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

const endpoint = "https://api.remotebootcamp.dev/api/jobs";
const status = {
    notset: 0,
    active: 1,
    deleted: 2,
    flagged: 3
}
// const statusNotSet = 0;
// const statusActive = 1;
// const statusDeleted = 2;
// const statusFlagged = 3;


const add = (payload) => {
    console.log("... @ jobService.add is executing ...");
  
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
 
  };

  const update = (id, payload) => {
    console.log("... @ jobService.update is executing ...");
  
    const config = {
      method: "PUT",
      url: endpoint + "/" + id,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  
  };

  const getByPage = (pageIndex, pageSize) => {
    console.log("... @ jobService.getById is executing ... ");
  
    let compositeEndPt = endpoint +
      `?pageIndex=${pageIndex}&pageSize=${pageSize}`;// ${}
  
    const config = {
      method: "GET",
      url: compositeEndPt,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    
  };

  const search = (pageIndex, pageSize, textToMatch) => {
    console.log("... @ jobService.search is executing ...", textToMatch);
  
    // not case sensitive
  
    // /search?pageIndex=0&pageSize=5&searchTerm=dev
  
    const entityPath = `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${textToMatch}`;
  
    const config = {
      method: "GET",
      url: endpoint + entityPath,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const setStatus = (id, statusInt) => {
    console.log("... @ jobService.setStatus is executing ...", id, statusInt);
  
    const config = {
      method: "PUT",
      url: endpoint + "/" + id + "/" + statusInt,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).then(()=>id).catch(onGlobalError);

  };

  const deleteJob = (id) => {
      return setStatus(id, status.deleted);
  }


export  { add, update, getByPage, search, setStatus, deleteJob, 
    status };

/**
 * ==================================================================================
 
POST
https://api.remotebootcamp.dev/api/jobs

{
  "title": "string",
  "description": "string",
  "summary": "string",
  "pay": "string",
  "slug": "string",
  "statusId": "NotSet",
  "techCompanyId": 0,       18353 - 18360, 
  "skills": [
    "string"
  ]
}
{
  "errors": [
    "The field TechCompanyId must be between 1 and 2147483647."
  ],
  "isSuccessful": false,
  "transactionId": "e322fc79-1504-496a-9349-89e5c2d9b7b6"
}
-------------------------------------------
{
  "title": "A job",
  "description": "that pays good",
  "summary": "if you can code these skills",
  "pay": "60000",
  "slug": "code it or lose it",
  "statusId": "Active",
  "techCompanyId": 18360,
  "skills": [
    "React","HTML CSS"
  ]
}
{
  "item": 18365,
  "isSuccessful": true,
  "transactionId": "4c22fd1e-034f-4310-8144-5e8975fae6ec"
}
-----------------------------------------------
{
  "title": "A tech job",
  "description": "that pays better",
  "summary": "if you can code these skills",
  "pay": "70000",
  "slug": "code for us dot com",
  "statusId": "Active",
  "techCompanyId": 18359,
  "skills": [
    "React", "SQL"
  ]
}
{
  "item": 18366,
  "isSuccessful": true,
  "transactionId": "e0dc58b2-7523-45fc-b2ac-17493734a310"
}
----------------------------------


=================================================================
GET   by   page
https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=5
{
    "item": {
        "pageIndex": 0,
        "pageSize": 5,
        "totalCount": 11,
        "totalPages": 3,
        "pagedItems": [
            {
                "id": 18500,
                "title": "adsfasf",
                "description": "ASDFASDF",
                "summary": "SDFASF",
                "pay": "100000",
                "entityTypeId": 6,
                "slug": "fDFASDF",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 983,
                        "name": "ASDF"
                    },
                    {
                        "id": 984,
                        "name": "ASDFAS"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T18:48:12.21",
                "dateModified": "2020-11-04T18:48:12.21"
            },
            {
                "id": 18499,
                "title": "Code Pizza",
                "description": "the circle of life d",
                "summary": "the circle of coding d",
                "pay": "30003",
                "entityTypeId": 6,
                "slug": "read it and eat it",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 969,
                        "name": "React"
                    },
                    {
                        "id": 980,
                        "name": "HandTossed"
                    },
                    {
                        "id": 981,
                        "name": "JavaScript"
                    },
                    {
                        "id": 982,
                        "name": "d"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T18:31:32.4733333",
                "dateModified": "2020-11-04T18:31:50.4466667"
            },
            {
                "id": 18498,
                "title": "Test 2",
                "description": "Test 2b",
                "summary": "Test 2b",
                "pay": "20002",
                "entityTypeId": 6,
                "slug": "test2",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 978,
                        "name": "test2"
                    },
                    {
                        "id": 979,
                        "name": "test22"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T18:26:04.73",
                "dateModified": "2020-11-04T18:27:05.6433333"
            },
            {
                "id": 18497,
                "title": "Test 1",
                "description": "test 1",
                "summary": "test 1",
                "pay": "10001",
                "entityTypeId": 6,
                "slug": "test1",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 976,
                        "name": "test 11"
                    },
                    {
                        "id": 977,
                        "name": "test1"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T18:24:23.2666667",
                "dateModified": "2020-11-04T18:24:23.2666667"
            },
            {
                "id": 18478,
                "title": "SW Dev",
                "description": "something",
                "summary": "somet",
                "pay": "120000",
                "entityTypeId": 6,
                "slug": "make code work",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 969,
                        "name": "React"
                    },
                    {
                        "id": 973,
                        "name": "resilience"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T17:41:26.1433333",
                "dateModified": "2020-11-04T17:41:26.1433333"
            }
        ],
        "hasPreviousPage": false,
        "hasNextPage": true
    },
    "isSuccessful": true,
    "transactionId": "f520b327-6577-414d-8957-5ba1056e1620"
}







=================================================================

GET
https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=5&searchTerm=dev


    "item": {
        "pageIndex": 0,
        "pageSize": 5,
        "totalCount": 2,
        "totalPages": 1,
        "pagedItems": [
            {
                "id": 18478,
                "title": "SW Dev",
                "description": "something",
                "summary": "somet",
                "pay": "120000",
                "entityTypeId": 6,
                "slug": "make code work",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 969,
                        "name": "React"
                    },
                    {
                        "id": 973,
                        "name": "resilience"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T17:41:26.1433333",
                "dateModified": "2020-11-04T17:41:26.1433333"
            },
            {
                "id": 18430,
                "title": "Make A Wish Developer",
                "description": "Making the impossible possible",
                "summary": "to help those in need",
                "pay": "50000",
                "entityTypeId": 6,
                "slug": "we dream big",
                "statusId": "Active",
                "skills": [
                    {
                        "id": 969,
                        "name": "React"
                    },
                    {
                        "id": 972,
                        "name": ".Net"
                    },
                    {
                        "id": 973,
                        "name": "resilience"
                    }
                ],
                "techCompany": {
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
                "dateCreated": "2020-11-04T00:23:33.0366667",
                "dateModified": "2020-11-04T00:23:33.0366667"
            }
        ],
        "hasPreviousPage": false,
        "hasNextPage": false
    },
    "isSuccessful": true,
    "transactionId": "d634cad3-8ee5-496a-be1a-8c39459a6960"
}

=================================================================
DELETE
405 Method Not Allowed
Use Update and change statusId

18500
18407
18406
18497
18498
18366
18365
18478
=================================================================

18499, 18478, 18436, 18430, 18366, 18365
=================================================================

=================================================================

=================================================================

=================================================================

 */