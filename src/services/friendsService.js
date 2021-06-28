import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

//const endpoint = "https://api.remotebootcamp.dev/api/friends";
const endpoint = "https://localhost:50001/api/friends";

 
const add = (payload) => {
    console.log("... @ friendsService.add is executing ...");
  
    // payload = {
    //   "title": "friend #31",
    //   "bio": "there when i need them",
    //   "summary": "lost a shoe in 82",
    //   "headline": "fuzzy",
    //   "slug": "steal honey from beehive with bear hands",
    //   "statusId": "Active",
    //   "primaryImage": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
    // }
  
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { 
        //'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  
const getById = (id) => {    // XXX UNTESTED
    console.log("... @ friendsService.getById is executing ... ", id);
  
    const config = {
      method: "GET",
      url: endpoint + "/" + id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  
const getByPage = (pageIndex, pageSize) => {
    console.log("... @ friendsService.getById is executing ... ");
  
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
  
const update = (id, payload) => {
    console.log("... @ friendsService.update is executing ...");
  
    const config = {
      method: "PUT",
      url: endpoint + "/" + id,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  
  
const deleteFriend = (id) => {
    console.log("... @ friendsService.delete is executing ...", id);
    // const breakingId = 181818181818;
  
    const entityPath = `/${id}`;
  
    const config = {
      method: "DELETE",
      url: endpoint + entityPath,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(onGlobalSuccess)
      .then(()=> id)
      .catch(onGlobalError);
  };
  
const searchNames = (pageIndex, pageSize, textToMatch) => {
    console.log("... @ friendsService.searchNames is executing ...", textToMatch);
  
    // not case sensitive
  
    // /search?pageIndex=0&pageSize=5&q=four%20score%20and%20twenty%20years%20ago
  
    const entityPath = `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${textToMatch}`;
  
    const config = {
      method: "GET",
      url: endpoint + entityPath,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

export  { add, getById, getByPage, update, deleteFriend, searchNames };

  
  /**   friendsService.searchNames(0,20,"Scud")
   * {"item":{"pageIndex":0,"pageSize":20,"totalCount":2,"totalPages":1,"pagedItems":
   * [{"id":7314,"bio":"Born in neighbors tree. Invaded our tree. Nuisance to all his
   * entire life. 2","title":"Scud 3","summary":"Prefers to use delicate and expensive
   * plants for nest 3","headline":"Jams the airways 3","entityTypeId":1,
   * "statusId":"Active","slug":"Flies high and lets everyone know it 3","skills":null,
   * "primaryImage":{"id":6354,"entityId":7314,"imageTypeId":"Main",
   * "imageUrl":"https://cdn.pixabay.com/photo/2019/12/08/19/06/bird-4681934_960_720.jpg"},
   * "dateCreated":"2020-10-24T21:49:50.22","dateModified":"2020-10-24T21:49:50.22"},
   *
   * {"id":7251,"bio":"Born in neighbors tree. Invaded our tree. Nuisance to all his entire life. 2",
   * "title":"Scud 2","summary":"Prefers to use delicate and expensive plants for nest 2",
   * "headline":"Jams the airways 2","entityTypeId":1,"statusId":"Active",
   * "slug":"Flies high and lets everyone know it 2","skills":null,
   * "primaryImage":{"id":6319,"entityId":7251,"imageTypeId":"Main",
   * "imageUrl":"https://cdn.pixabay.com/photo/2019/12/08/19/06/bird-4681934_960_720.jpg"},
   * "dateCreated":"2020-10-23T20:48:17.81","dateModified":"2020-10-24T18:05:22.5866667"}],
   * "hasPreviousPage":false,"hasNextPage":false},
   *
   * "isSuccessful":true,"transactionId":"ccdf0ffe-3d68-42c9-a350-1df192d80b67"}
   */
  
  
  // =============================================================================
  //  -------         API and POSTMAN Data Collection notes   -- SUCCESS,  AND DELETE WRONG ID EXAMPLE
  
  
  /*
  
  List of known created friends:
  7169, 7170, 7230, 7233, 7234, 7250, 7251, 7252, 7282, 7283, 7285, 7290
  
  POST
   /api​/friends
  Endpoint to add a Friend record to the database
  
  curl -X POST "https://api.remotebootcamp.dev/api/friends" -H "accept: application/json"
  -H "Content-Type: application/json"
  -d "{\"title\":\"friend #2\",\"bio\":\"there when i need them\",\"summary\":\"lost a shoe in 82\",
  \"headline\":\"hickory\",\"slug\":\"eats shoes\",\"statusId\":\"29285373\",
  \"primaryImage\":\"https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg\"}"
  
  >> slug    must be unique
  
  {              // went with lulu id....
    "title": "friend #3",
    "bio": "there when i need them",
    "summary": "lost a shoe in 82",
    "headline": "hickory",
    "slug": "runs with stick",
    "statusId": "29285373",   [ NotSet, Active, Deleted, Flagged ]
    "primaryImage": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
  }
  {
    "item": 7167,
    "isSuccessful": true,
    "transactionId": "f22ed906-f21f-409d-a125-b7f4aa376656"
  }
  ........................................
  
  {
    "title": "friend #10",
    "bio": "there when i need them",
    "summary": "lost a shoe in 82",
    "headline": "hickory",
    "slug": "swims with sharks",
    "statusId": "active",
    "primaryImage": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
  }
  {
    "item": 7168,
    "isSuccessful": true,
    "transactionId": "5c01eefb-439c-4aea-b158-74743ef9bb94"
  }
   .......................
  {
    "title": "friend #21",
    "bio": "four score and twenty years ago",
    "summary": "watch out for your cherry trees",
    "headline": "laso",
    "slug": "old Nick",
    "statusId": "Active",
    "primaryImage": "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_1280.jpg"
  }
  {
      "item": 7169,
      "isSuccessful": true,
      "transactionId": "087de913-9883-4ba4-b79a-cafe04b4c328"
  }
  ...........................
  
  {
      "item": 7170,
      "isSuccessful": true,
      "transactionId": "270fbd42-f178-499a-92fb-4a21625a3ff5"
  }
   --------------------+++++++++++++++++++---------------
  GET
   /api​/friends
  Endpoint to get a paginated response of records
  
  
  curl -X GET "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=5" -H "accept: application/json"
  https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=5
  
  
  https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=3
  
  {
      "item": {
          "pageIndex": 0,
          "pageSize": 5,
          "totalCount": 3,
          "totalPages": 1,
          "pagedItems": [
              {
                  "id": 7170,
                  "bio": "victory over eagles",
                  "title": "friend #22",
                  "summary": "soars",
                  "headline": "veracity",
                  "entityTypeId": 1,
                  "statusId": "Active",
                  "slug": "swift",
                  "skills": null,
                  "primaryImage": {
                      "id": 6208,
                      "entityId": 7170,
                      "imageTypeId": "Main",
                      "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                  },
                  "dateCreated": "2020-10-20T03:27:11.33",
                  "dateModified": "2020-10-20T03:27:11.33"
              },
              {
                  "id": 7169,
                  "bio": "four score and twenty years ago",
                  "title": "friend #21",
                  "summary": "watch out for your cherry trees",
                  "headline": "laso",
                  "entityTypeId": 1,
                  "statusId": "Active",
                  "slug": "old Nick",
                  "skills": null,
                  "primaryImage": {
                      "id": 6207,
                      "entityId": 7169,
                      "imageTypeId": "Main",
                      "imageUrl": "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_1280.jpg"
                  },
                  "dateCreated": "2020-10-20T03:15:20.1266667",
                  "dateModified": "2020-10-20T03:15:20.1266667"
              },
              {
                  "id": 7168,
                  "bio": "there when i need them",
                  "title": "friend #10",
                  "summary": "lost a shoe in 82",
                  "headline": "hickory",
                  "entityTypeId": 1,
                  "statusId": "Active",
                  "slug": "swims with sharks",
                  "skills": null,
                  "primaryImage": {
                      "id": 6206,
                      "entityId": 7168,
                      "imageTypeId": "Main",
                      "imageUrl": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
                  },
                  "dateCreated": "2020-10-20T03:04:26.51",
                  "dateModified": "2020-10-20T03:04:26.51"
              }
          ],
          "hasPreviousPage": false,
          "hasNextPage": false
      },
      "isSuccessful": true,
      "transactionId": "835b78e6-aaa7-4f36-931e-01b8ab15d142"
  }
  
  ---------------------++++++++++++++++++++++++++++++------------------------------
  
  PUT
   /api​/friends​/{id}
  Endpoint to update a record with the matching Id
  
  curl -X PUT "https://api.remotebootcamp.dev/api/friends/7167"
  -H "accept: application/json" -H "Content-Type: application/json"
  -d "{\"id\":7176,\"title\":\"string\",\"bio\":\"string\",\"summary\":\"string\",
  \"headline\":\"string\",\"slug\":\"string\",\"statusId\":\"NotSet\",\"primaryImage\":\"string\"}"
  
  https://api.remotebootcamp.dev/api/friends/7167
  
  {
    "id": 7176,
    "title": "string",
    "bio": "string",
    "summary": "string",
    "headline": "string",
    "slug": "string",
    "statusId": "NotSet",
    "primaryImage": "string"
  }
  {
    "isSuccessful": true,
    "transactionId": "4858454d-1126-4a96-bba2-c9a7dfa2251f"
  }
  
  VIA POSTMAN
  {
    "id": 7176,
    "title": "string",
    "bio": "string",
    "summary": "string",
    "headline": "string",
    "slug": "bloody nose",
    "statusId": "NotSet",
    "primaryImage": "string"
  }
  {
      "isSuccessful": true,
      "transactionId": "fa2ec534-2a67-4206-b0cf-d6476a0dd1c9"
  }
  ---------------++++++++++++++++++++++++++++++---------------------------------------
  
  GET
   /api​/friends​/{id}
  Endpoint to get the record with matching Id
  
  curl -X GET "https://api.remotebootcamp.dev/api/friends/7167" -H "accept: application/json"
  
  https://api.remotebootcamp.dev/api/friends/7167
  
  {
      "item": {
          "id": 7165,
          "bio": "there when i need them",
          "title": "friend #3",
          "summary": "lost a shoe in 82",
          "headline": "hickory",
          "entityTypeId": 1,
          "statusId": "NotSet",
          "slug": "chases small balls",
          "skills": null,
          "primaryImage": {
              "id": 6203,
              "entityId": 7165,
              "imageTypeId": "Main",
              "imageUrl": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
          },
          "dateCreated": "2020-10-20T03:02:53.0166667",
          "dateModified": "2020-10-20T03:02:53.0166667"
      },
      "isSuccessful": true,
      "transactionId": "e788c3ac-7da1-4dbb-9c3a-56e4b3a4d28f"
  }
  {
      "item": {
          "id": 7166,
          "bio": "there when i need them",
          "title": "friend #3",
          "summary": "lost a shoe in 82",
          "headline": "hickory",
          "entityTypeId": 1,
          "statusId": "NotSet",
          "slug": "chases many small balls",
          "skills": null,
          "primaryImage": {
              "id": 6204,
              "entityId": 7166,
              "imageTypeId": "Main",
              "imageUrl": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
          },
          "dateCreated": "2020-10-20T03:03:02.05",
          "dateModified": "2020-10-20T03:03:02.05"
      },
      "isSuccessful": true,
      "transactionId": "6177e06a-be45-4f14-a9c8-79dc6d8d310d"
  }
  {
    "item": {
      "id": 7167,
      "bio": "string",
      "title": "string",
      "summary": "string",
      "headline": "string",
      "entityTypeId": 1,
      "statusId": "NotSet",
      "slug": "bloody nose",
      "skills": null,
      "primaryImage": {
        "id": 6210,
        "entityId": 7167,
        "imageTypeId": "Main",
        "imageUrl": "string"
      },
      "dateCreated": "2020-10-20T03:03:18.8166667",
      "dateModified": "2020-10-20T03:43:57.4133333"
    },
    "isSuccessful": true,
    "transactionId": "5a3b4e82-0303-4cf2-a97b-324123d71487"
  }
  
  https://api.remotebootcamp.dev/api/friends/7168
  {
      "item": {
          "id": 7168,
          "bio": "there when i need them",
          "title": "friend #10",
          "summary": "lost a shoe in 82",
          "headline": "hickory",
          "entityTypeId": 1,
          "statusId": "Active",
          "slug": "swims with sharks",
          "skills": null,
          "primaryImage": {
              "id": 6206,
              "entityId": 7168,
              "imageTypeId": "Main",
              "imageUrl": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
          },
          "dateCreated": "2020-10-20T03:04:26.51",
          "dateModified": "2020-10-20T03:04:26.51"
      },
      "isSuccessful": true,
      "transactionId": "000b618d-2173-4174-bd9a-7c3ae5f1fe3b"
  }
  
  -----------------------+++++++++++++++++++----------------------------
  
  DELETE
   /api​/friends​/{id}
  Endpoint to delete a record
  
  **** Items are not actually deleted from the database. Their status is simply
  changed to "Deleted" so that they are not returned in most Api calls.
  
  https://api.remotebootcamp.dev/api/friends/7164   /// test on non-existant
  
  500	Error: Internal Server Error
  {
    "errors": [
      "Id or UserId does not exist"
    ],
    "isSuccessful": false,
    "transactionId": "8ff0de93-8155-447e-a15c-47ccb6ae79cc"
  }
  .....................
  https://api.remotebootcamp.dev/api/friends/7165
  {
    "isSuccessful": true,
    "transactionId": "e9cf8f59-3b19-4d90-9292-508f51e1e179"
  }
  
  BUT NOT ACTUALLY DELETING!!!!
  
   "statusId": "Deleted",
  
   CAN STILL GET BY ID, BUT won't show on pagination
  ........................
  
  {
      "item": {
          "pageIndex": 0,
          "pageSize": 5,
          "totalCount": 2,
          "totalPages": 1,
          "pagedItems": [
              {
                  "id": 7170,
                  "bio": "victory over eagles",
                  "title": "friend #22",
                  "summary": "soars",
                  "headline": "veracity",
                  "entityTypeId": 1,
                  "statusId": "Active",
                  "slug": "swift",
                  "skills": null,
                  "primaryImage": {
                      "id": 6208,
                      "entityId": 7170,
                      "imageTypeId": "Main",
                      "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
                  },
                  "dateCreated": "2020-10-20T03:27:11.33",
                  "dateModified": "2020-10-20T03:27:11.33"
              },
              {
                  "id": 7169,
                  "bio": "four score and twenty years ago",
                  "title": "friend #21",
                  "summary": "watch out for your cherry trees",
                  "headline": "laso",
                  "entityTypeId": 1,
                  "statusId": "Active",
                  "slug": "old Nick",
                  "skills": null,
                  "primaryImage": {
                      "id": 6207,
                      "entityId": 7169,
                      "imageTypeId": "Main",
                      "imageUrl": "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_1280.jpg"
                  },
                  "dateCreated": "2020-10-20T03:15:20.1266667",
                  "dateModified": "2020-10-20T03:15:20.1266667"
              }
          ],
          "hasPreviousPage": false,
          "hasNextPage": false
      },
      "isSuccessful": true,
      "transactionId": "af9f9ec8-4b17-4f7a-8855-57e93b55fc7e"
  }
  
  ---------------------------+++++++++++++++++-----------------------
  
  GET
   /api​/friends​/search
  Endpoint that will Search records using query parameter and return an a paginated response
  
  https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=5&q=%22%20%22
  
  {
    "errors": [
      "Record not found"
    ],
    "isSuccessful": false,
    "transactionId": "d520d1af-a831-4c36-9494-d6d720c9aef3"
  }
  ................
  0
  5
  four score and twenty years ago
  
  https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=5&q=four%20score%20and%20twenty%20years%20ago
  
  {
    "item": {
      "pageIndex": 0,
      "pageSize": 5,
      "totalCount": 1,
      "totalPages": 1,
      "pagedItems": [
        {
          "id": 7169,
          "bio": "four score and twenty years ago",
          "title": "friend #21",
          "summary": "watch out for your cherry trees",
          "headline": "laso",
          "entityTypeId": 1,
          "statusId": "Active",
          "slug": "old Nick",
          "skills": null,
          "primaryImage": {
            "id": 6207,
            "entityId": 7169,
            "imageTypeId": "Main",
            "imageUrl": "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_1280.jpg"
          },
          "dateCreated": "2020-10-20T03:15:20.1266667",
          "dateModified": "2020-10-20T03:15:20.1266667"
        }
      ],
      "hasPreviousPage": false,
      "hasNextPage": false
    },
    "isSuccessful": true,
    "transactionId": "6553712e-6d9f-4559-b91b-bcafc2a9575a"
  
    --------------------------++++++++++++++++++++++------------------------
  
    PUT
   /api​/friends​/{id}​/{statusId}
  Endpoint to update the status of Friend
  
  https://api.remotebootcamp.dev/api/friends/7165/Flagged
  
  {
    "isSuccessful": true,
    "transactionId": "056408b4-bc99-4a45-84a5-0f9af02ef8ee"
  }
  
  {
      "item": {
          "id": 7165,
          "bio": "there when i need them",
          "title": "friend #3",
          "summary": "lost a shoe in 82",
          "headline": "hickory",
          "entityTypeId": 1,
          "statusId": "Flagged",
          "slug": "chases small balls",
          "skills": null,
          "primaryImage": {
              "id": 6203,
              "entityId": 7165,
              "imageTypeId": "Main",
              "imageUrl": "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
          },
          "dateCreated": "2020-10-20T03:02:53.0166667",
          "dateModified": "2020-10-20T04:32:20.0866667"
      },
      "isSuccessful": true,
      "transactionId": "7c68538c-1b89-4c05-8439-9528dc41cf2a"
  }
  
  https://api.remotebootcamp.dev/api/friends/7166/Flagged
  {
      "isSuccessful": true,
      "transactionId": "adc0d4dc-909e-42d5-8372-a558330e4689"
  }
  
  
  -----------------------+++++++++++++++++++++++++_-----------------------
  
  GET
   /api​/friends​/{slug}
  Endpoint to get a person by Slug
  
  https://api.remotebootcamp.dev/api/friends/swift
  
  {
    "item": {
      "id": 7170,
      "bio": "victory over eagles",
      "title": "friend #22",
      "summary": "soars",
      "headline": "veracity",
      "entityTypeId": 1,
      "statusId": "Active",
      "slug": "swift",
      "skills": null,
      "primaryImage": {
        "id": 6208,
        "entityId": 7170,
        "imageTypeId": "Main",
        "imageUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg"
      },
      "dateCreated": "2020-10-20T03:27:11.33",
      "dateModified": "2020-10-20T03:27:11.33"
    },
    "isSuccessful": true,
    "transactionId": "fa86c89f-51f1-44e8-b462-65646548e6f0"
  }
  
  
  */