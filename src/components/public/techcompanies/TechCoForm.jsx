import React from "react";
// import * as friendsService from "../../../services/friendsService";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

class TechCo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">TechCo</div>
          <form>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
            {/* ----------------------- NEW ROW */}
            <div className="form-row"></div>
          </form>
        </div>
      </div>
    );
  }
}

export default TechCo;

/**
 * 
 * Request URL          POST
https://api.remotebootcamp.dev/api/techcompanies
 
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



 */
