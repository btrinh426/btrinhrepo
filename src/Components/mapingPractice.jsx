import React from "react";

class mapingPractice extends React.Component {
  state = {
    someArray: [
      { id: "hello", name: "George" },
      { id: "goodBye", name: "Ringo" },
      { id: "Mello", name: "Star" },
    ],
  };
  render() {
    return (
      <div>
        {this.state.someArray.map((oneObj) => (
          <h5>{oneObj.name}</h5>
        ))}
      </div>
    );
  }
}

export default mapingPractice;
