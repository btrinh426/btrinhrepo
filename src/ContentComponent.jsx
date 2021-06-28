import React from "react";
// import * as userService from "./services/userService";

// componentDidMount() {
//   console.log("componentDidMount");

//   userService
//   .logIn(data)
//   .then(function (data) {
//     console.log("Login Success", data);
//   })
//   .catch(function (data) {
//     console.warn(data);
//   });

//   console.log("componentDidMount end");
// }

function ContentComponent() {
  function buttonClicked() {
    console.log("feeling sleepy");
    // const data = {
    //   email: "user@example.com",
    //   password: "String1.1!",
    //   tenantId: "42",
    // };

    // userService
    //   .logIn(data)
    //   .then(function (data) {
    //     console.log("Login Success", data);
    //   })
    //   .catch(function (data) {
    //     console.warn(data);
    //   });
  }
  // buttonClicked();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={buttonClicked}
          >
            Push Me
          </button>
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
        </div>
      </div>

      <hr />
    </div>
  );
}

export default ContentComponent;
