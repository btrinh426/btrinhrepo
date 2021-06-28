import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

const endpoint = "https://api.remotebootcamp.dev/api/jobs";

const add = (payload) => {
    console.log("... @ eventService.add is executing ...");
  
    const config = {
      method: "POST", 
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };


const parseLat = (latStr) =>{
    //45°02'45.8"N 123°31'33.6"W
    const deg = latStr.split("°");
    const min = deg[1].split("'");
    const sec = min[1].split(`"`);
    const dir = sec[1];
    console.log("deg", deg[0], " min", min[0], " sec", sec[0], " dir ", dir );
    let value = (((parseFloat(sec[0]) / 60) + (parseInt( min[0])))/ 60) + parseInt(deg[0]) 
    value = dir.toLowerCase().includes("n") ? value : (value * (-1));
    return value;
}

const parseLon = (lonStr) =>{
    //45°02'45.8"N 123°31'33.6"W
    const deg = lonStr.split("°");
    const min = deg[1].split("'");
    const sec = min[1].split(`"`);
    const dir = sec[1];
    console.log("deg", deg[0], " min", min[0], " sec", sec[0], " dir ", dir );
    let value = (((parseFloat(sec[0]) / 60) + (parseInt( min[0])))/ 60) + parseInt(deg[0]) 
    value = dir.toLowerCase().includes("e") ? value : (value * (-1));
    return value;
}

export { add, parseLat, parseLon }
// { add, update, getByPage, search, setStatus, deleteJob,  status };



/**
 * 
====================================== ADD - POST ========================
EventAddRequest{
description:	
Event Add Request

metaData*	{
dateStart*	string($date-time)
Start Date of Event

dateEnd*	string($date-time)
End Date of Event

location*	{...}
}
name*	string
maxLength: 25
minLength: 2
The name of the event being added

headline*	string
maxLength: 120
minLength: 2
The headline title for an event, used for sharing post

description*	string
maxLength: 2147483647
minLength: 2
A rich text field that describes the specific details of the an event

summary*	string
maxLength: 255
minLength: 2
Summarizes the event, used for sharing/Seo

slug*	string
maxLength: 100
minLength: 2
a unique string to create a unique url based on the title of event

statusId	string
Enum:
[ NotSet, Active, Deleted, Flagged ]
}


45°02'45.8"N 123°31'33.6"W
https://api.remotebootcamp.dev/api/events

{
  "metaData": {
    "dateStart": "2020-12-06T00:59:06.830Z",
    "dateEnd": "2020-12-06T00:59:06.930Z",
    "location": {
      "latitude": 45.046055555,
      "longitude": -123.526,
      "zipCode": "97396",
      "address": "8765 Yamhill River Rd, Willamina, OR"
    }
  },
  "name": "name 1",
  "headline": "headline 1",
  "description": "description 1",
  "summary": "summary 1",
  "slug": "slug 1",
  "statusId": "Active"
}

{
  "item": 18575,
  "isSuccessful": true,
  "transactionId": "ca4db824-dee8-4cf5-ab28-8eb12b74b521"
}
{
  "metaData": {
    "dateStart": "2020-12-06T01:59:06.1030Z",
    "dateEnd": "2020-12-06T02:59:06.1130Z",
    "location": {
      "latitude": 45.046055555,
      "longitude": -123.526,
      "zipCode": "97396",
      "address": "8765 Yamhill River Rd, Willamina, OR"
    }
  },
  "name": "name 2",
  "headline": "headline 1",
  "description": "description 1",
  "summary": "summary 1",
  "slug": "slug 2",
  "statusId": "Active"
}

{
  "item": 18577,
  "isSuccessful": true,
  "transactionId": "86db82be-3ec6-4f09-adb8-f74574ffdfc3"
}

{
  "metaData": {
    "dateStart": "2020-12-06T01:59:06.1030Z",
    "dateEnd": "2020-12-06T02:59:06.1130Z",
    "location": {
      "latitude": 45.046055555,
      "longitude": -123.526,
      "zipCode": "97396",
      "address": "8765 Yamhill River Rd, Willamina, OR"
    }
  },
  "name": "name 3",
  "headline": "headline 1",
  "description": "description 1",
  "summary": "summary 1",
  "slug": "slug 3",
  "statusId": "Active"
}

{
    "item": 18583,
    "isSuccessful": true,
    "transactionId": "ea067e2d-4be9-4420-b036-2bb26c83e611"
}

8351 SE 3 Trees Ln
Amity, OR 97101
45.127941, -123.154393

====================================== XX - XXX ========================



{
  "id": 0,
  "metaData": {
    "dateStart": "2020-11-07T00:09:28.943Z",
    "dateEnd": "2020-11-07T00:09:28.943Z",
    "location": {
      "latitude": 0,
      "longitude": 0,
      "zipCode": "string",
      "address": "string"
    }
  },
  "name": "string",
  "headline": "string",
  "description": "string",
  "summary": "string",
  "slug": "string",
  "statusId": "NotSet"
}

18583

====================================== XX - XXX ========================


====================================== XX - XXX ========================


====================================== XX - XXX ========================



42.314807950969424, -88.44728008907458
 */