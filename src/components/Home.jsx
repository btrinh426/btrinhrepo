import React from "react";
import Imgs from "../services/ImageService.jsx";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col">
              <img src={Imgs.ship} alt="" />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
