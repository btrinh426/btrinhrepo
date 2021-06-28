import React from "react";

class Fundamentals extends React.Component {
  state = {
    people: [
      { name: "Dan", age: 40 },
      { name: "Gregorio", age: "?" },
      { name: "John", age: 50 },
      { name: "John", age: 40 },
    ],
  };

  fixGregorio = () => {
    //this.state.people[1].age = 45;

    let index = 1;

    const newPeople = [
      ...this.state.people.slice(0, index),
      {
        ...this.state.people[index],
        age: 45,
      },
      ...this.state.people.slice(index + 1), //using +1 so we dont grab gregorio obj
    ];
  };

  render() {
    return (
      <div>
        <button onClick={this.fixGregorio}>Fix</button>
        <pre>{JSON.stringify(this.state, null, 3)}</pre>
      </div>
    );
  }
}

export default Fundamentals;
