import React from "react";

class Presidents extends React.Component {
  state = {
    name: ["George Washington", "John Adams", "Thomas Jefferson"],
    presidents: [
      { name: "George Washington", id: 1 },
      { name: "John Adams", id: 2 },
    ],
  };

  componentDidMount = () => {
    this.setState((prevState) => {
      return { mappedPresidents: prevState.presidents.map(this.mapPresident) };
    });
  };

  mapPresident = (onePresident) => {
    return <p key={`Pres=${onePresident.id}`}>{onePresident.name}</p>;
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Presidents</h1>
        <div className="row">
          <div className="col">
            {/* {this.state.presidents.map(this.mapPresident)} */}
            {this.state.mappedPresidents}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Presidents;
