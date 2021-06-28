import React, { Component } from "react";
import {MDBNavbar, MDBIcon, MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './login';

class Navigation extends React.Component {
    state = {
        isOpen: false
    };
    
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        return (
            <BrowserRouter>
            
                <MDBNavbar color= 'stylish-color' dark expand="md" style={{marginBottom: '75px'}}>
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
                    <MDBNavbarNav right >
                        <MDBNavItem style={{ marginRight: '50px' }}>
                        <MDBFormInline waves>
                            <div className="input-group md-form my-0" >
                                <div className="input-group-prepend">
                                    <span className="input-group-text unique-color-dark lighten-3" id="basic-text1">
                                        <MDBIcon className="text-white" icon="search" />
                                    </span>
                                </div>
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
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
                        <MDBNavItem active >

                        <MDBNavLink as={Link} to="/login" >Sign In</MDBNavLink>
                        
                        </MDBNavItem>
                        
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <Switch>
                    <Route exact path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Navigation;