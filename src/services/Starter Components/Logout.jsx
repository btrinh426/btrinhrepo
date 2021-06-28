import React from "react";
import { NavLink } from "react-router-dom";

class Logout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <style type="text/css">{`.navbar {display: none}`}</style>

        <div style={{ backgroundColor: "orange" }}>
          <div
            style={{
              backgroundImage: `url("https://thumbs.dreamstime.com/b/burnt-trash-can-unknown-pests-burned-plastic-either-vandals-sake-destruction-competing-garbage-collection-164754791.jpg")`,
              backgroundSize: "cover",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div
              style={{
                fontFamily: "fantasy",
                fontSize: "50px",
                textAlign: "center",
              }}
            >
              So sad to see you go. <br />
              Come back and light more fires soon!
            </div>
            <div>
              <NavLink to="/LoginForm"> Log back in? </NavLink>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Logout;
