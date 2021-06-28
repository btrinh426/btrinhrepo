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
    onLogOut = e => {
        e.preventDefault();
        const success = Swal.fire({
            title: "Thanks for visiting a Happy Place, come back soon!",
            button: "See Ya",
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        const error = () => console.log("Error");
        logout(success, error);
    };
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
                            <Nav.Link href="home">Home</Nav.Link>
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
