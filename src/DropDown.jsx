import React from "react";

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
  }

  render() {
    return (
      <div className="dd-wrapper">
        <div className="dd-header">
          <div className="dd-header-title">Select cars</div>
        </div>
        <div className="dd-list">
          <button className="dd-list-item">button one</button>
          <button className="dd-list-item">button two</button>
          <button className="dd-list-item">button three</button>
        </div>
      </div>
    );
  }
}

export default DropDown;
