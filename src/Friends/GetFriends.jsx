import React, { Component } from "react";
import { Button, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { getAll, removeById, search } from "../services/friendsService";
import Pagination from 'rc-pagination';
import SingleFriend  from './SingleFriend';

class GetFriends extends Component {
  state = {
    currentUser: [
      {
        id: 0,
        title: "",
        primaryImage: "",
        summary: "",
        bio: "",
        headline: "",
        slug: "",
        status: 1,
        skills: ""
      },
    ],
    query: "",
    isSearchSuccess: false,
    isGetByIdSuccess: false,
    isGetFriendsSuccess: false,
    pageIndex: 0,
    pageSize: 5
  };

  componentDidMount() {
    console.log("getFriends Component did Mount");
    getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsError = (err) => {
    console.error(err);
  };

  onGetFriendsSuccess = (response) => {
    console.log("on GetFriendsSuccess response: ", response);
    let mappedFriends = response.data.item.pagedItems;
    this.setState(() => {
      // add to state the current index and the total number of records
      return { friendToMap: mappedFriends.map(this.mapFriend) }
    });
    return <Pagination />
  };

  onEditClick = (e) => {
    e.preventDefault();
  };

  mapFriend = (oneFriend) => {
    return (
      <SingleFriend singleFriend={oneFriend} onClick={this.onEditClick}/>
    );
  };

  // onEditClick = (e) => {
  //   e.preventDefault();
  //   let id = e.currentTarget.id;
  //   // this history .push needs a url
  //   this.props.history.push(id);
  // }

  onDeleteClick = (e) => {
    e.preventDefault();
    let id = e.currentTarget.id;
    removeById(id)
    .then(this.onDeleteSuccess)
    .catch(this.onDeleteError)
  }
  
  onDeleteError = (err) => {
    console.error(err);
  };

  onDeleteSuccess = (response) => {
    console.log('Delete operation was a success', response);
    this.setState((prevState) => {
      return prevState;
    });
  };

  onSearchFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let query = this.state.query;
      query = newValue;
      console.log('{query}', { query })
      return { query };
    });
  };

  onSearchClick = (e) => {
    e.preventDefault();
    search(0, 5, this.state.query)
    .then(this.onSearchSuccess)
    .catch(this.onSearchError)
  };

  onSearchSuccess = (response) => {
    console.log(`Your search results: Name - ${response.data.item.pagedItems[0].title}, Id - ${response.data.item.pagedItems[0].id}`);
    console.log('response data: ', response.data.item.pagedItems[0])
    let foundFriend = response.data.item.pagedItems[0];
    // update the state 
    this.setState(() => {
      let searchData = { ...this.state };
      searchData.currentUser[0].title = foundFriend.title;
      searchData.currentUser[0].summary = foundFriend.summary;
      searchData.currentUser[0].id = foundFriend.id;
      searchData.currentUser[0].primaryImage = foundFriend.primaryImage.imageUrl;
      searchData.isSearchSuccess = true;
      console.log('searchData: ', searchData);
      return searchData;
    });
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

        <div>{this.state.friendToMap}</div>
        <div>
          {this.state.isSearchSuccess && 
            <div className="row" key={this.state.currentUser[0].id}>
              <Card className="col-md-3">
                <CardImg
                  top
                  width="100%"
                  src={this.state.currentUser[0].primaryImage}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">{this.state.currentUser[0].title}</CardTitle>
                  <CardText>{this.state.currentUser[0].summary}</CardText>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </CardBody>
              </Card>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default GetFriends;