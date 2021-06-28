import React from "react";
import { NavLink } from "react-router-dom";

class Logout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <style type="text/css">{`.navbar {display: none}`}</style>
        <div style={{ backgroundColor: "orange" }}>
          <div
            className="container"
            style={{
              backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ca9c157-26fa-4163-acc5-1f88b53a5216/dcf0nf6-cbef10cd-ad02-4e4c-a6dc-c61e6a71ee03.jpg/v1/fill/w_1024,h_925,q_75,strp/dumpster_fire_by_blank_mange_dcf0nf6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD05MjUiLCJwYXRoIjoiXC9mXC8xY2E5YzE1Ny0yNmZhLTQxNjMtYWNjNS0xZjg4YjUzYTUyMTZcL2RjZjBuZjYtY2JlZjEwY2QtYWQwMi00ZTRjLWE2ZGMtYzYxZTZhNzFlZTAzLmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.QMqofgohPNJzO-Sl5vYSaXg6I5mjzg8gd3xDo30KrK0")`,
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
                color: "yellow",
                textShadow: "4px 4px green",
              }}
            >
              Come back soon you crazy kid!
            </div>
            <div
              className="row"
              style={{ marginTop: "100px", marginRight: "50px" }}
            >
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Logged out by mistake?</h5>
                    <p className="card-text">
                      Some mistakes are less forgivable than others, like faking
                      a logout!
                    </p>
                    <NavLink to="/LoginForm"> Log back in? </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Logout;
