import React, { state } from 'react';
import Register from '../components/register';
import { useHistory } from "react-router-dom";
// import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn } from 'mdbreact';
import * as userService from "../services/userService";

class Login extends React.Component {
    state = {
        "email": "",
        "password": "",
        "tenantId": "GME1TO2THE3MOON"
    };
// ************Turn change handlers into one function***********
    handleEmailChange =(e) =>{
        this.setState({email: e.target.value});
    };

    handlePasswordChange = (e) =>{
        this.setState({password: e.target.value});
    }

    handleTenantIdChange = (e) =>{
        this.setState({tenantId: e.target.value});
    }
// **************************************************
    handleLogin = (e) =>{
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);
        console.log(this.state);
        e.stopPropagation();

        userService.logIn(this.state)
            .then(this.onLogInSuccess)
            .catch(this.onLogInError);
    }

    onLogInSuccess = (response) => {
        
        //localStorage.setItem('user', response.config.data);
        console.log(response.config.data, 'You have Successfully Logged in!');
        this.props.history.push('/products');
        
    }
    
    onLogInError= (errResponse) => {
        console.log(errResponse);
    }


    
    
    render(){
    return (
        <MDBContainer>
            <MDBRow style={{ width: '75%', justifyContent: 'flex-end', marginLeft: '33%'}}>
                <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody className="mx-4">
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                        <strong>Sign in</strong>
                        </h3>
                    </div>
                    <MDBInput
                        label="Your email"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <MDBInput
                        label="Your password"
                        group
                        type="password"
                        validate
                        containerClass="mb-0"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                        Forgot
                        <a href="" className="blue-text ml-1">

                        Password?
                        </a>
                    </p>
                    <div className="text-center mb-3">
                        <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={this.handleLogin}
                        >
                        Sign in
                        </MDBBtn>
                    </div>
                    </MDBCardBody>
                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                        Not a member?
                        <a href="/register" className="blue-text ml-1">

                        Sign Up
                        </a>
                    </p>
                    </MDBModalFooter>
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
}

export default Login;