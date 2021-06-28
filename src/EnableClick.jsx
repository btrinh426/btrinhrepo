import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  onClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.whenClicked}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }
  return (
    <a
      href="https://github.com/sabiocode/wiki/blob/2be205f2d3bd64867c8acaf6a4392c2172b45cb1/javascript/React/React-Router.md"
      onClick={handleClick}
    >
      Click me
    </a>
  );
}

export default Toggle;
