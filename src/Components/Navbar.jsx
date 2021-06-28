import React from "react";
import Swal from "sweetalert2";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import logo from "../logo.svg";
import { logout } from "../services/userService";

class MyNav extends React.Component {
    class = {
        isUserActive: false,
        currentUser: {
            firstName: "",
            lastName: "",
            photo: "",
        },
    };
    onLogOut = e => {
        e.preventDefault();

        logout().then(this.success).catch(this.fail);
    };

    success = res => {
        Swal.fire({
            title: "Thanks for visiting a Happy Place, come back soon!",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
        });
        setTimeout(() => {
            this.props.history.push("/");
        }, 1000);
    };
    fail = err => console.log("Error");

    render() {
        return (
            <React.Fragment>
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="Home">
                        <img
                            alt=""
                            src={logo}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{" "}
                        A Happy Place
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="Home">Home</Nav.Link>
                            <Nav.Link href="Friends">Friends</Nav.Link>
                            <Nav.Link href="Jobs">Jobs</Nav.Link>
                            <Nav.Link href="Companies">Tech Companies</Nav.Link>
                            <NavDropdown
                                title="Login / Register"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="Register">
                                    Register
                                </NavDropdown.Item>
                                <NavDropdown.Item href="Login">
                                    Login
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href="Logout"
                                    onClick={this.onLogOut}
                                >
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}
export default MyNav;
