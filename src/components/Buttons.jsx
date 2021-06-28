import React from "react";

class Buttons extends React.Component {


  
  render() {
    return (
        <button
        type="submit"
        className="btn btn-primary"
        onClick={this.onClickHandler}
      >
        Submit
      </button>

      
    );
  }
}

export default Buttons;