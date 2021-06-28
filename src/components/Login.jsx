import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import userService from "Service/userService"
export class Login extends React.Component {
    state = {
        formInfo: {

            email: "sabio@sabio11.la",     // "sabio@sabio10.la"
            password: "blackbuck", //"Sabiopassword1!"

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
    componentDidMount() {
        //userService.register().then(this.onRegisterSuccess).catch(this.onRegisterError)
    }
    loginClicked = () => {
        console.log("I was clicked!!!");
    };

    render() {
        return (
            <Form>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={this.onFormFieldChanged}
                        value={this.state.forminfo.email}
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



                <Button variant="primary" type="submit" onClick={this.loginClicked}>
                    Login
        </Button>
            </Form>
        );
    }
}

export default Login;
