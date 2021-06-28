import React, { Component } from "react";

class Jumbo extends Component {
  //these lines relate to making class objects
  //how to set up THIS particular objects... what is unique, what is different we set that up in here
  //props is a bundle of data that show up from the component invocation? I forget the word
  // super(props) is a formatlity that is required when extending components
  // constructor(props) {
  //   super(props);
  //real code work goes here

  //componentDidMount(){}
  //componentDidUpdate(){}
  //componentWillMount(){}
  //componentWillUpdate(){}
  //componentWillUnmount(){}

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <button className="btn btn-primary btn-lg">
              Learn more &raquo;
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Jumbo;
