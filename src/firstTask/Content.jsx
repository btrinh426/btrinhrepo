import React from "react";

class MainCont extends React.Component {
  // clickButton = () => {
  //   const payload = { email: "scooter.pop@hotmail.com", password: "ScooterPop#1!", tenantId: "U01CZ6XELN4" };
  //   userService.logIn(payload)
  //   .then(this.onActionSuccess)
  //   .catch(this.onActionError);

  // };

  // onActionSuccess = (response) => {
  //   console.log("Success")
  //  }

  //  onActionError= (errResponse) => {
  //   console.log("Failure")
  //  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Etiam porta sem malesuada
            magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Etiam porta sem malesuada
            magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>
            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Vestibulum id ligula porta felis euismod semper.
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus.
          </p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
          <button
            onClick={this.clickButton}
            type="button"
            className="btn btn-danger"
          >
            Danger
          </button>
        </div>
      </div>
    );
  }
}

export default MainCont;
