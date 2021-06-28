import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import debug from "sabio-debug";
const _logger = debug.extend("Friends");

function FriendCard(props) {
  _logger(props);

  const onDeleteFriendClicked = () => {
    props.onDel(friend.id);
  };

  const editFriendClicked = () => {
    props.editData(friend);
  };

  let friend = props.friend;
  return (
    <Card className="well well-sm">
      {" "}
      <CardImg
        top
        width="100%"
        src={friend.primaryImage}
        alt="Card image cap"
      />
      <CardHeader style={{ fontWeight: "bold" }}>{friend.title}</CardHeader>
      <CardBody>
        <CardText>
          <span>{friend.summary}</span>
        </CardText>
      </CardBody>
      <Button color="secondary" onClick={editFriendClicked}>
        Edit{" "}
      </Button>{" "}
      <Button color="danger" onClick={onDeleteFriendClicked}>
        Delete
      </Button>{" "}
    </Card>
  );
}

// return props.myFriends.map(mapFriend);

export default FriendCard;
