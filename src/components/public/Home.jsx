import React from "react";

class Home extends React.Component {
  // componentDidUpdate(prevProps) {
  //   console.log("... Home > componentDidUpdate firing ...");
  //   let currentPath = this.props.location.pathname;
  //   let previousPath = prevProps.location.pathname;
  //   console.log("app", { currentPath, previousPath });
  // }

  render() {
    return (
      <div className="container">
        <div className="card mt-4" id="cardValidUserLanding">
          <div className="card-body">
            <div className="row">
              <div className="col">
                Welcome {this.props.currentUser.firstName}
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col">This is your home page.</div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col">Keep it clean and organized.</div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col">So it can serve you well.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
