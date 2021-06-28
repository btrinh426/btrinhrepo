import React from "react";
// import FriendForm from "./FirendForm";
import FriendsList from "./FriendsList";

class ViewFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfFriends: [
        { id: 1, name: "Tony", summary: "I am Iron Man." },
        { id: 2, name: "Wanda", summary: "I am from Wacovia." },
        { id: 3, name: "Vision", summary: "I can move through walls." },
      ],
      selectedIndividual: null,
    };
  }

  onSelectedItemChange = (person, event) => {
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

  onCancel = (e) => {
    e.preventDefault();
    console.log("onCancel clicked");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-6">
            <h1>Friends list</h1>
            <div className="panel panel-default">
              <div className="pannel-heading"></div>
              <div className="pannel-body">
                {/* friendList does the maping and putting into cards */}
                {/* then gets inserted here */}
                <FriendsList
                  avengers={this.state.listOfFriends}
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
