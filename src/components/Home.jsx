import React from "react";
import { Button } from "reactstrap";
import { logIn, logOut, userIdLogIn } from "./userService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  componentDidMount() {
    // make axios call here for current
    // on the succes you need to call getById
    //on success of last one set State to change the name of who is logged in

    logIn().then((response) => {
      userIdLogIn(response.data.id).then((user) => {
        console.log(user);
        this.setState({ userName: user.data.firstName });
      });
    });
  }

  onButtonClicked = () => {
    console.log("Hi");
    logOut().then(() => {
      this.props.history.push("/newlogin");
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Welcome Home {this.state.userName}</h1>
        <div>
          <Button
            color="primary"
            onClick={this.onButtonClicked.bind(this)}
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Log Out
          </Button>
          <div> {"See you soon!"} </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
