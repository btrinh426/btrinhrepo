import React from "react";

class Carousel extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Great!</h5>
            <p>Okay!</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Carousel;
