import React from "react";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";

const Friend = (props) => {
  return (
    <Card
      className=""
      // onClick={(e) => props.onAvengerClicked(friend, e)}
    >
      <CardHeader style={{ fontWeight: "bold" }}>
        Name: {props.friend.title}
      </CardHeader>
      <CardBody>
        <CardText>
          <span>
            <img
              src={props.friend.primaryImage.imageUrl}
              className="rounded img-thumbnail"
              alt="user avatar"
            />
          </span>
          {"   "}

          <span>{props.friend.summary}</span>
          {"   "}
          <span>
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => props.selectFriend(props.friend, e)}
            >
              Edit
            </button>
            {"   "}
            <button className="btn btn-danger btn-sm">Delete</button>
          </span>
        </CardText>
      </CardBody>
    </Card>

    // {/* <div className="card mb-3 col-md-6">
    //       <div className="row flex-xl-nowrap">
    //         <img
    //           src={this.state.currentUserData.avatarUrl}
    //           className="rounded img-thumbnail"
    //           alt="user avatar"
    //         />
    //       </div>
    //       <div className="row no-gutters">
    //         <div className="col-md-12">
    //           <div className="card-body">
    //             <h5 className="card-title pt-3 pb-2">A</h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div> */}
  );
};

export default Friend;
