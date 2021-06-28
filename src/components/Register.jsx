import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import userService from "Service/userService"
export class Register extends React.Component {
    state = {
        formInfo: {
            firstName: "bob",   //tom
            lastName: "tale",   //ford
            email: "sabio@sabio11.la",     // "sabio@sabio10.la"
            password: "blackbuck", //"Sabiopassword1!"
            passwordConfirm: "blackbuck", //"Sabiopassword1!"
            avatarUrl: "https://stackoverflow.com/users/155861/diecho",
            tenantId: "bootcamp19" //bootcamp10
        }

    };

    //  need AJax call

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.type;
        //console.log({ newValue, currentTarget });


        this.setState(() => {
            let newState = {};

            newState[inputName] = newValue;
            return newState;
        });
    }

    ///////////////Start here?????????????????
    // componentDidMount() {

    // }
    registerClicked = () => {
        console.log("I was clicked!!!");
    };

    render() {
        return (

            <Form>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="fisrtName"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.firstName}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="lastName"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.lastName}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.email}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.password}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.confirmPassword}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicAvatarUrl">
                    <Form.Label>AvatarUrl</Form.Label>
                    <Form.Control
                        type="avatarUrl"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formInfo.avatarUrl}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.registerClicked}>
                    Register
        </Button>
            </Form>
        );
    }
}

export default Register;
