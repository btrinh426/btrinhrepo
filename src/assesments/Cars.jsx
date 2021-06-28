import React from "react";

class Cars extends React.Component {
  onShowCarsClick = () => {
    this.props.history.push("/show.cars");
  };
  render() {
    let titleStyles = {
      marginRight: "500px",
      marginLeft: "680px",
      marginTop: "10px",
    };

    let buttonStyles = {
      marginRight: "500px",
      marginLeft: "680px",
      marginTop: "40px",
    };

    return (
      <React.Fragment>
        <h1 style={titleStyles}>Cars!</h1>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={buttonStyles}
          onClick={this.onShowCarsClick}
        >
          Show Cars
        </button>
      </React.Fragment>
    );
  }
}

export default Cars;
