import React from "react";

class CarsHide extends React.Component {
  onShowCarsClicked = () => {
    this.props.history.push("/cars");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Cars</h1>
        </div>
        <button
          className="bt bt-outline-primary bt-sm"
          type="button"
          onClick={this.onShowCarsClicked}
        >
          Show Cars
        </button>
      </React.Fragment>
    );
  }
}

export default CarsHide;
