import React from "react";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";

function FriendsList(props) {
  let mapFriend = (friend) => {
    return (
      <Card
        className=""
        key={"FriendId_" + friend.id} //this key needs to be unique, top component needs key
        onClick={(e) => props.onAvengerClicked(friend, e)}
      >
        {" "}
        <CardHeader style={{ fontWeight: "bold" }}>{friend.name}</CardHeader>
        <CardBody>
          <CardText>
            <span>({friend.id})</span> - <span>{friend.summary}</span>
          </CardText>
        </CardBody>
      </Card>
    );
  };
  return props.avengers.map(mapFriend);
}
export default FriendsList;
