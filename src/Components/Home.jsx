import React from "react";
import {
  getUserInfo,
  getCurrentUser,
  userLogOut,
} from "../services/userService";
// import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: "",
    };
  }

  componentDidMount() {
    getCurrentUser().then((response) => {
      getUserInfo(response.data.item.id).then((userInfo) => {
        console.log(userInfo);
        this.setState({
          currentUserName:
            userInfo.data.item.firstName + " " + userInfo.data.item.lastName,
        });
      });
    });
  }

  onLogOutButtonClick(e) {
    userLogOut().then(() => {
      this.props.history.push("/login");
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-md-4 offset-md-4">
          <div>
            <div className="header">
              <h1>Welcome {this.state.currentUserName}</h1>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.onLogoutButtonClick}
          >
            Logout
          </button>
          {/* <div>
            <Link to={"/friends"} class="Button ">
              View your friends now here.
            </Link>
          </div>
          <div>
            <Link to={"/blogs"} class="Button ">
              Check out new blogs now here.
            </Link>
          </div>
          <div>
            <Link to={"/tech"} class="Button ">
              View tech companies now here.
            </Link>
          </div>
          <div>
            <Link to={"/jobs"} class="Button ">
              View new job opportunities here.
            </Link>
          </div>
          <div>
            <Link to={"/events"} class="Button ">
              See new events here.
            </Link>
          </div>
          <div>
            <Link to={"/register"} class="Button ">
              Not registered? Register now here.
            </Link>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
