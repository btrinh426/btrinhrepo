import React from 'react'
import Misc from "../scripts/misc"
import Services from "../scripts/services"
import EventHandler from "../scripts/eventHandler"

class LoginMainContent extends React.Component {

    state = {
        payload: {
            email: "user0@example.com",
            password: "exPassword#1234",
            tenantId: "00001"
        },
        errors: []
    };

    componentDidMount () {
        Misc.loginCheck(this.props);
    };

    onPayloadChange = (e) => {
        const newState = EventHandler.inputOnChange(e, ["payload"], {... this.state});
        this.setState(newState);
    }

    onLoginSubmit = (e) => {
            EventHandler.onItemClick(e, this.state.payload)
                .then(this.onLoginSuccess)
                .catch(this.onLoginFailure);
    }

    onLoginSuccess = () => {
        this.stateLoginErrors([]);
        Misc.renderToast("success", "Login Success");
        EventHandler.onLoggedInChange(true, this.props);
    }

    onLoginFailure = (response) => {
        const errors = response.response.data.errors;
        this.stateLoginErrors(errors);
        Misc.renderToast("error", "Login Failed!");
    }

    stateLoginErrors = (errorArray) => {
        const stateCopy = {... this.state};
        stateCopy.errors = errorArray;
        this.setState(stateCopy);
    }

    render(){
         return (
            <React.Fragment>
                <form>
                    <p>Sign In</p>
                    <div className="form-input">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Email" 
                        name="email" 
                        onChange={this.onPayloadChange}
                        value={this.state.payload.email}
                        />
                    </div>
                    <div className="form-input">
                        <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        name="password" 
                        onChange={this.onPayloadChange}
                        value={this.state.payload.password}
                        />
                    </div>
                    <div>
                        <div>
                            <p>I forgot my password</p>
                            <p>Register a new membership</p>
                        </div>
                        <button 
                        type="button" 
                        className="btn btn-primary" 
                        name="login-submit-button"
                        onClick={this.onLoginSubmit}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </React.Fragment>

         );
    }
}

export default LoginMainContent;