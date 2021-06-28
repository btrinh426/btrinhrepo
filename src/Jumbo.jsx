import React from "react";

class Jumbo extends React.Component {
  state = {
    greeting: "Hello, world!",
  };

  handleGreet = () => {
    this.setState((prevState, currentProps) => {
      return { ...prevState, greeting: "Somemthing new" };
    }, this.logState);
  };

  logState = () => {
    console.log("After setting state", this.state);
  };

  render() {
    return (
      <div />
      //   <div className="jumbotron">
      //     <div className="container">
      //       <h1 className="display-3">{this.state.greeting}</h1>
      //       <p>
      //         This is a template for a simple marketing or informational website.
      //         It includes a large callout called a jumbotron and three supporting
      //         pieces of content. Use it as a starting point to create something
      //         more unique.
      //       </p>
      //       <p>
      //         <button
      //           className="btn btn-primary btn-lg"
      //           onClick={this.handleGreet}
      //         >
      //           Learn more &raquo;
      //         </button>
      //       </p>
      //     </div>
      //   </div>
    );
  }
}

export default Jumbo;
