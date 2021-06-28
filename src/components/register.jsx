import React from "react";
// import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import * as userService from "../services/userService";

class Register extends React.Component {
    state = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "passwordConfirm": "",
        "avatarUrl": "",
        "tenantId": "GME1TO2THE3MOON"
    };
// ************Turn change handlers into one function***********
    handleFName =(e) =>{
        this.setState({firstName: e.target.value});
    };

    handleLName =(e) =>{
        this.setState({lastName: e.target.value});
    };

    handleEmail =(e) =>{
        this.setState({email: e.target.value});
    };

    handlePassword = (e) =>{
        this.setState({password: e.target.value});
    }

    handlePasswordConfirm = (e) =>{
        this.setState({passwordConfirm: e.target.value});
    }

    handleAvUrl =(e) =>{
        this.setState({avatarUrl: e.target.value});
    };

    handleTenantId = (e) =>{
        this.setState({tenantId: e.target.value});
    }
// **************************************************
    handleRegistration = () =>{
        console.log(this.state);
    
        userService.register(this.state)
            .then(this.onRegisterSuccess)
            .catch(this.onRegisterError);
    }

    onRegisterSuccess = (response) => {
        console.log(response, 'You are Successfully Registered!');
    }
    
    onRegisterError= (errResponse) => {
        console.log(errResponse);
    }

    render() {
    return (
        <MDBContainer>
            <MDBRow style={{ justifyContent: 'center'}}>
                <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                    <form>
                        <p className="h4 text-center py-4">Sign up</p>
                        <div className="grey-text">
                        <MDBInput
                            label="First Name"
                            //icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this.handleFName}
                        />
                        <MDBInput
                            label="Last Name"
                            // icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this.handleLName}
                        />
                        <MDBInput
                            label="Email Address"
                            // icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this.handleEmail}
                        />
                        <MDBInput
                            label="Enter a Password"
                            // icon="lock"
                            group
                            type="password"
                            validate
                            onChange={this.handlePassword}
                        />
                        <MDBInput
                            label="Confirm password"
                            // icon="lock"
                            group
                            type="password"
                            validate
                            onChange={this.handlePasswordConfirm}
                        />
                        <MDBInput
                            label="Avatar Url"
                            // icon="lock"
                            group
                            type="url"
                            validate
                            onChange={this.handleAvUrl}
                        />
                        </div>
                        <div className="text-center py-4 mt-3">
                        <MDBBtn 
                        className="blue-gradient" 
                        type="button"
                        onClick={this.handleRegistration}>
                            Register
                        </MDBBtn>
                        </div>
                    </form>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
}

export default Register;