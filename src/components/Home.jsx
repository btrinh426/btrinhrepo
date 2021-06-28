import React from "react";

class Home extends React.Component {

  render() {

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col">
              <img
                src="https://i.pinimg.com/originals/70/b8/84/70b884aa0f14db5f2224005982e17f5e.png"
                alt=""
              />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
