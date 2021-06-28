import React from "react";
import { Sidebar, Icon, Item, LogoText } from "react-sidebar-ui";
import "react-sidebar-ui/dist/index.css";
import "react-pro-sidebar/dist/css/styles.css";
import * as userService from "../../services/UserService";
import { toast } from "react-toastify";
import "font-awesome/css/font-awesome.min.css";
import {
  faHome,
  faInfo,
  faPencilAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class SiteNav extends React.Component {
  onButtonClicked = (e) => {
    e.preventDefault();
    const data = {
      email: "mgcraig78@gmail.com",
      password: "1a$3TYx%4",
      tenantId: "U01GYCKSGAV",
    };
    userService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    toast.success("Login Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(response);
  };
  onLoginError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ position: "sticky" }}>
            <Sidebar bgColor="black" isCollapsed={false}>
              <div style={{ paddingTop: "6rem", margin: "2rem" }}>
                {/* <Logo image="" imageName="free gif" /> */}
                <LogoText>HELLO</LogoText>
              </div>
              <div style={{ margin: ".5rem" }}>
                <Link to="/Home">
                  <Item bgColor="black">
                    <Icon>
                      <FontAwesomeIcon icon={faHome} />
                    </Icon>
                    Home
                  </Item>
                </Link>
              </div>
              <div style={{ margin: ".5rem" }}>
                <Link to="/Register">
                  <Item bgColor="black">
                    <Icon>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Icon>
                    Register
                  </Item>
                </Link>
              </div>
              <div style={{ margin: ".5rem" }}>
                <Link to="/Content">
                  <Item bgColor="black">
                    <Icon>
                      <FontAwesomeIcon icon={faInfo} />
                    </Icon>
                    Static Page
                  </Item>
                </Link>
              </div>
              <div style={{ margin: ".5rem" }}>
                <Link to="/">
                  <Item bgColor="black">
                    <Icon>
                      <FontAwesomeIcon icon={faSignInAlt} />
                    </Icon>
                    Login
                  </Item>
                </Link>
              </div>
            </Sidebar>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SiteNav;
