import React from "react";

class mappingPractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleList: [
        { id: "hello", name: "George" },
        { id: "goodBye", name: "Ringo" },
        { id: "Mello", name: "Star" },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.peopleList.map((person) => (
          <h5>
            {person.name}
            {"   "}
            {person.id}
          </h5>
        ))}
      </div>
    );
  }
}

export default mappingPractice;
