import React from "react";
import WelcomeMessage from "./WelcomeMessage";

class Disney extends React.Component {
  constructor(props) {
    super(props);
    console.log("Disney constructor");
    this.state = {
      localMessage: "I am Disney",
      //   message: (
      //     <strong>Count of Friends {this.props.friend.friends.length}</strong>
      //   ),
    };
  }

  getMessage = () => {
    return <strong>Count of Friends {this.props.friend.friends.length}</strong>;
  };

  render() {
    this.props.showGreeting(this.state.localMessage);
    return (
      <React.Fragment>
        <h1>{this.state.localMessage}</h1>
        <div>
          <span style={{ padding: "5px" }}>{this.props.friend.firstName}</span>
          <span style={{ padding: "5px" }}>{this.props.friend.lastName}</span>
        </div>
        {/* <div>{this.state.message}</div> */}
        <WelcomeMessage
          user={this.props.friend}
          extra={this.getMessage()}
          end="GoodBye."
        ></WelcomeMessage>
      </React.Fragment>
    );
  }
}

export default Disney;
