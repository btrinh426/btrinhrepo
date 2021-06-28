import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Friends from './Friends';

class Navigation extends React.Component {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	render() {
		return (
			<BrowserRouter>
				{/* <MDBNavbar color="stylish-color" dark expand="md" style={{ marginBottom: '75px' }}>
					<MDBNavbarBrand>
						<strong className="white-text">Stonks</strong>
					</MDBNavbarBrand>
					<MDBNavbarToggler onClick={this.toggleCollapse} />
					<MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
						<MDBNavbarNav left>
							<MDBNavItem active>
								<MDBNavLink to="#!">Home</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to="#!">Blogs</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to="#!">Tech Companies</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to="#!">Jobs</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to="#!">Events</MDBNavLink>
							</MDBNavItem>
						</MDBNavbarNav>
						<MDBNavbarNav right>
							<MDBNavItem style={{ marginRight: '50px' }}>
								<MDBFormInline waves>
									<div className="input-group md-form my-0">
										<div className="input-group-prepend">
											<span
												className="input-group-text unique-color-dark lighten-3"
												id="basic-text1"
											>
												<MDBIcon className="text-white" icon="search" />
											</span>
										</div>
										<input
											className="form-control mr-sm-2"
											type="text"
											placeholder="Search"
											aria-label="Search"
										/>
									</div>
								</MDBFormInline>
							</MDBNavItem>
							<MDBNavItem>
								<MDBDropdown>
									<MDBDropdownToggle nav caret>
										<span className="mr-2">User</span>
									</MDBDropdownToggle>
									<MDBDropdownMenu>
										<MDBDropdownItem href="#!">Friends</MDBDropdownItem>
										<MDBDropdownItem href="#!">Log Out</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBNavItem>
							<MDBNavItem active>
								<MDBNavLink as={Link} to="/login">
									Sign In
								</MDBNavLink>
							</MDBNavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBNavbar> */}

				{/* //-------------------------------------------- */}
				<Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item as={Link} to="/friends">
									Friends
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form inline>
							<FormControl type="text" placeholder="Search" className="mr-sm-2" />
							<Button variant="outline-primary">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/friends" component={Friends} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Navigation;
