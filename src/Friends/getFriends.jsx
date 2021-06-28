import React, { Component } from "react";
import { Button, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { getFriendById, getFriends, searchFriend, updateFriend } from "../services/friendsService";

class GetFriends extends Component {
  state = {
    currentUser: [
      {
        firstName: "",
        lastName: "",
        title: "",
        primaryImage: "",
        summary: "",
      },
    ],
    query: ""
  };

  componentDidMount() {
    console.log("getFriends Component did Mount");
    getFriends(0, 10)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsError = (err) => {
    console.error(err);
  };

  onGetFriendsSuccess = (response) => {
    console.log("on GetFriendsSuccess response: ", response);
    this.props.history.push("/friends/getAll");
    let mappedFriends = response.data.item.pagedItems;
    this.setState(() => {
      return { friendToMap: mappedFriends.map(this.mapFriend) }
    });
  };

  // create mapping function from response data
  mapFriend = (oneFriend) => {
    return (
      <div className="container" key={oneFriend.id}>
        <div className="row">
          <Card className="col-md-3">
            <CardImg
              top
              width="100%"
              src={oneFriend.primaryImage.imageUrl}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{oneFriend.title}</CardTitle>
              <CardText>{oneFriend.summary}</CardText>
              <Button id={oneFriend.id} className="btn btn-primary" onClick={this.onEditClick}>Edit</Button>
              <Button id={oneFriend.id} className="btn btn-primary" onClick={this.onDeleteClick}>Delete</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  };

  onEditClick = (e) => {
    e.preventDefault();
    // get id from the current target
    console.log("e.currentTarget.id", e.currentTarget.id);
    let id = e.currentTarget.id;
    getFriendById(id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError)
  }

  onUpdateError = (err) => {
    console.error(err);
  };

  onUpdateSuccess = (response) => {
    console.log('response data from a successful updateFriend ajax request: ', response);
  }

  onSearchFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let query = this.state.query;
      query = newValue;
      console.log('{query}', {query})
      return {query};
    });
  };

  onSearchClick = (e) => {
    e.preventDefault();
    searchFriend(0, 5, this.state.query)
    .then(this.onSearchSuccess)
    .catch(this.onSearchError)
  };

  onSearchSuccess = (response) => {
    console.log(`Your search results: Name - ${response.data.item.pagedItems[0].title}, Id - ${response.data.item.pagedItems[0].id}`);
    let foundFriend = response.data.item.pagedItems[0];

    return (
      <div className="row" key={foundFriend.id}>
        <Card className="col-md-3">
          <CardImg
            top
            width="100%"
            src={foundFriend.primaryImage.imageUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">{foundFriend.title}</CardTitle>
            <CardText>{foundFriend.summary}</CardText>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </CardBody>
        </Card>
      </div>
    );
  };

  onSearchError = (err) => {
    console.log('No match for your search');
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <div row={1} className="form-group has-search">
          <h3 className="text-secondary text-left">People</h3>
          <Button
            className="fa fa-search form-control-feedback"
            onClick={this.onSearchClick}
          ></Button>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={this.onSearchFieldChanged}
          ></input>
        </div>
        <div>{this.state.friendToMap}</div>;
      </React.Fragment>
    );
  }
}

export default GetFriends;


  