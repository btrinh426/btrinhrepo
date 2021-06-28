import React from "react";
import showFriends from "../services/listService";

class List extends React.Component {
  state = {
    friendForm: [
      {
        title: "aaa",
        id: 1,
        bio: "aaa",
        summary: "aaa",
        slug: "aaa",
        statusId: "aaa",
        primaryImage: "aaa",
      },
    ],
    testNames: [
      {
        name: "another name",
        id: 111,
        bio: "a few more strings",
        summary: "a summary",
      },
      {
        name: "a cuter name",
        id: 2,
        bio: "maybe a clever blurb",
        summary: "a summaryyyy",
      },
      {
        name: " a silly name",
        id: 300,
        bio: "check me out ",
        summary: "a summaryyyyyy",
      },
    ],
  };

  componentDidMount() {
    // showFriends()
    //   .then(this.onShowFriendsSuccess)
    //   .catch(this.onShowFriendsError);
    console.log(this.state);
    this.setState(() => {
      return;
    });
  }

  onShowFriendsSuccess(response) {
    let allFriends = response.data.item;
    console.log(allFriends);
    // this.setState(() => {
    //   return { mappedFriends: allFriends.map(this.mapFriend) };
    // });
  }

  onShowFriendsError(err) {
    console.log(err);
  }

  //mapper passed w/ test array
  mapFriend = (aFriend) => {
    return (
      <div className="card" key={`Names-${aFriend.id}`}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">some content{aFriend.title}</h5>
          <p className="card-text">
            {aFriend.bio}
            content.
          </p>
          <p className="card-text">{aFriend.summary}</p>
          <button className="btn btn-primary link-btn">edit</button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="col">
          <div className="row">
            <p>some content</p>
          </div>
        </div>
        <div className="col-md-12">
          {/* {this.state.testNames.map(this.mapFriend)} */}
        </div>
      </div>
    );
  }
}

export default List;
