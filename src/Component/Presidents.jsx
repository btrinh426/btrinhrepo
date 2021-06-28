import React from "react";

class Presidents extends React.Component {
  state = {
    name: ["George Washington", "John Adams", "Thomas Jefferson"],
    presidents: [{ name: "George Washington", id: 1 }],
  };

  componentDidMount() {}

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Presidents</h1>
        <hr />
        <div className="row">
          <div className="col"> {this.state.presidents} </div>
        </div>
      </div>
    );
  }
}

export default Presidents;
