import React from "react";
import { Button, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function SingleFriend(props) {

  const oneFriend = props.singleFriend;
  
  function onEditClick() {
    console.log('onEditClick');
  };

  function onDeleteClick() {
    console.log('onDeleteClick');
  };

    return (
      <div className="container" key={oneFriend.id}>
        <div className="row">
          <Card className="col-md-3">
            <CardImg
              top
              width="100%"
              src={oneFriend.primaryImage && oneFriend.primaryImage.imageUrl}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{oneFriend.title}</CardTitle>
              <CardText>{oneFriend.summary}</CardText>
              <Button id={oneFriend.id} className="btn btn-primary" onClick={onEditClick}>Edit</Button>
              <Button id={oneFriend.id} className="btn btn-primary" onClick={onDeleteClick}>Delete</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
};

// export default SingleFriend;
export default React.memo(SingleFriend);
