import React from "react";

// needs to be a class to pass parameters to and Route
class WelcomeMessage extends React.Component {
    render = (props) => {
        return (<h1>{this.props.msg}</h1>);
    }
}

export default WelcomeMessage;