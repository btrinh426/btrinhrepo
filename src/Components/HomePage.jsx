import React from "react";
import Content from "./Content";
class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="jumbotron jumbotron-fluid mb-3 ">
            <div className="container">
              <div className="row float-right">
                <img
                  src={this.props.currentUser.avatarUrl}
                  className="rounded float-left img-thumbnail "
                  alt={this.props.currentUser.firstName}
                  style={{ maxHeight: "200px", maxWidth: "200px" }}
                />
              </div>
              <h1 className="display-4">
                Welcome, {this.props.currentUser.firstName}!
              </h1>
            </div>
          </div>
          <Content />
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
