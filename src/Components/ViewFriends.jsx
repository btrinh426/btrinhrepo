import React from "react";
import FriendForm from "./FriendForm";
import FriendsList from "./FriendsList";

class ViewFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfFriends: {
        item: {
          pageIndex: 0,
          pageSize: 5,
          totalCount: 6,
          totalPages: 2,
          pagedItems: [
            {
              id: 20159,
              bio: "aa",
              title: "aa",
              summary: "aa",
              headline: "aa",
              entityTypeId: 1,
              statusId: "Active",
              slug: "aaa",
              skills: null,
              primaryImage: {
                id: 8350,
                entityId: 20159,
                imageTypeId: "Main",
                imageUrl: "aa",
              },
              dateCreated: "2021-02-02T04:06:39.2933333",
              dateModified: "2021-02-02T04:08:36.8666667",
            },
            {
              id: 20145,
              bio: "aa",
              title: "aa",
              summary: "aa",
              headline: "aa",
              entityTypeId: 1,
              statusId: "Active",
              slug: "aa",
              skills: null,
              primaryImage: {
                id: 8340,
                entityId: 20145,
                imageTypeId: "Main",
                imageUrl: "aa",
              },
              dateCreated: "2021-02-02T03:48:07.7533333",
              dateModified: "2021-02-02T03:48:07.7533333",
            },
            {
              id: 20143,
              bio: "I am a developer. I develop things.",
              title: "Developer 1000",
              summary: "This is a summary.",
              headline: "I have something to say.",
              entityTypeId: 1,
              statusId: "Active",
              slug: "Bug3",
              skills: null,
              primaryImage: {
                id: 8339,
                entityId: 20143,
                imageTypeId: "Main",
                imageUrl: "url to some image",
              },
              dateCreated: "2021-02-02T03:42:04.32",
              dateModified: "2021-02-02T03:42:04.32",
            },
            {
              id: 19956,
              bio: "I am a developer. I develop things.",
              title: "Mrs.",
              summary: "This is a summary.",
              headline: "I have something to say.",
              entityTypeId: 1,
              statusId: "Active",
              slug: "Bug2",
              skills: null,
              primaryImage: {
                id: 8172,
                entityId: 19956,
                imageTypeId: "Main",
                imageUrl: "url to some image",
              },
              dateCreated: "2021-01-28T21:48:17.5533333",
              dateModified: "2021-01-28T21:48:17.5533333",
            },
            {
              id: 19955,
              bio: "I am a developer. I develop things.",
              title: "Mr.",
              summary: "This is a summary.",
              headline: "I have something to say.",
              entityTypeId: 1,
              statusId: "Active",
              slug: "Bug1",
              skills: null,
              primaryImage: {
                id: 8175,
                entityId: 19955,
                imageTypeId: "Main",
                imageUrl: "url to some image",
              },
              dateCreated: "2021-01-28T21:37:57.1833333",
              dateModified: "2021-01-28T22:09:58.39",
            },
          ],
          hasPreviousPage: false,
          hasNextPage: true,
        },
        isSuccessful: true,
        transactionId: "442a4957-388e-454c-80d6-04b279ca0394",
      },

      selectedIndividual: null,
    };
  }

  onSelectedItemChange = (person, event) => {
    console.log(person);
    this.setState(() => {
      return { selectedIndividual: person };
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;

    if (nextState.selectedIndividual === this.state.selectedIndividual) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {this.state.selectedIndividual && (
          <FriendForm firendToEdit={this.state.selectedIndividual}></FriendForm>
        )}

        <div className="row">
          <div className="col-sm-6">
            <h1>Friends list</h1>
            <div className="panel panel-default">
              <div className="pannel-heading"></div>
              <div className="pannel-body">
                {/* friendList does the maping and putting into cards */}
                {/* then gets inserted here */}
                <FriendsList
                  avengers={this.state.listOfFriends.item.pagedItems}
                  onAvengerClicked={this.onSelectedItemChange}
                  //can add more props to pass to children here
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="pannel-heading"></div>
              <div className="pannel-body"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewFriends;

//
