import React from "react";

class NavLinkButton extends React.Component {
  render = () => {
    let renderedValue = "";
    if (this.props.isEnabled) {
      renderedValue = (
        <li className="nav-item active">
          <button
            className="nav-link link-button"
            onClick={this.props.onDisplayFriends}
          >
            {this.props.title}
          </button>
        </li>
      );
    } else {
      renderedValue = (
        <li className="nav-item">
          <button
            disabled={true}
            className="nav-link link-button"
            onClick={this.props.onDisplayFriends}
          >
            {this.props.title}
          </button>
        </li>
      );
    }
    return renderedValue;
  };
}

export default NavLinkButton;
