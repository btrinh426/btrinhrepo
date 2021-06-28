import React from "react";
import UserService from "../services/usersServices";

class HomePage extends React.Component {
  state = { userName: null };

  componentDidMount() {
    UserService.currentUser()
      .then(this.onCurrUserSuccess)
      .catch(this.onCurrUserError);
  }
  onCurrUserSuccess = (response) => {
    let name = response.data.item.name;
    this.setState({ userName: name });
  };
  onCurrUserError = (response) => {
    console.log(response);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container home">
          <div className="row">
            <h3>Welcome {this.state.userName}!</h3>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
