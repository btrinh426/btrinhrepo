import React from 'react'
import Misc from "../scripts/misc"
import EventHandler from "../scripts/eventHandler"
import Services from "../scripts/services"

class RegisterMainContent extends React.Component {

    state = {
        payload: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "",
            tenantId: "00001"
        },
        termAgreeChecked: false,
        errors: []
    };

    componentDidMount () {
        Misc.loginCheck(this.props);
    };

    onPayloadChange = (e) => {
        const newState = EventHandler.inputOnChange(e, ["payload"], {... this.state});
        this.setState(newState);
    }

    onTermAgreeChecked = (e) => {
        const newState = EventHandler.inputOnChange(e, [], {... this.state});
        this.setState(newState);
    }

    onRegisterSubmit = (e) => {
        if(this.state.termAgreeChecked){
            //Render success/error toast
            EventHandler.onItemClick(e, this.state.payload)
                .then(this.onRegisterSuccess)
                    .then(() => {Misc.historySet(this.props, "/login/")})
                .catch(this.onRegisterFailure);
        } else {
            this.stateRegisterErrors(["Please Agree to the Terms to Proceed"]);
            Misc.renderToast("error", "Registration Failed!", "Please Agree to the Terms to Proceed");
            //Render error toast
        }
    }

    onRegisterSuccess = () => {
        this.stateRegisterErrors([]);
        Misc.renderToast("success", "Registration Success");
    }

    onRegisterFailure = (response) => {
        const errors = response.response.data.errors;
        this.stateRegisterErrors(errors);
        Misc.renderToast("error", "Registration Failed!");
    }

    stateRegisterErrors = (errorArray) => {
        const stateCopy = {... this.state};
        stateCopy.errors = errorArray;
        this.setState(stateCopy);
    }

    render(){
         return (
            <React.Fragment>
            <form className="register-form">
                <p className="register-form-label">Register a new membership</p>
                <div className="form-input">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="First Name" 
                    name="firstName" 
                    onChange={this.onPayloadChange}
                    value={this.state.payload.firstName}
                    />
                </div>
                <div className="form-input">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last Name" 
                    name="lastName" 
                    onChange={this.onPayloadChange}
                    value={this.state.payload.lastName}
                    />
                </div>
                <div className="form-input">
                    <input 
                    type="email" 
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
                <div className="form-input">
                    <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm Password" 
                    name="passwordConfirm" 
                    onChange={this.onPayloadChange}
                    value={this.state.payload.passwordConfirm}
                    />
                </div>
                <div className="form-input">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Avatar URL" 
                    name="avatarUrl" 
                    onChange={this.onPayloadChange}
                    value={this.state.payload.avatarUrl}
                    />
                </div>
                <div>
                    <div>
                        <input 
                        type="checkbox" 
                        className="checkbox" 
                        id="term-agreement-checkbox"
                        name="termAgreeChecked" 
                        onChange={this.onTermAgreeChecked}
                        value={this.state.termAgreeChecked}
                        />
                        <label htmlFor="term-agreement-checkbox">I agree to the terms</label>
                        <p className="color-blue login-page-link">Already have an account?</p>
                    </div>
                    
                    <button 
                    name="register-submit-button" 
                    type="button" 
                    className="btn btn-primary register-button" 
                    onClick={this.onRegisterSubmit}
                    >
                        Register
                    </button>

                </div>
            </form>
            
            <>
            
            {this.state.errors.map((error, i) => {return <p key={"uniqueId"+i}>{error}</p>})}

            </>
            </React.Fragment>

         );
    }
}

export default RegisterMainContent;