import React from "react";
import Services from "../../services/Sabio API Ajax/userServices"
import Toast from "../../scripts/toast"

class Login extends React.Component {

    state = {
        payload: {
            email: "user0@example.com",
            password: "exPassword#1234",
            tenantId: "00001"
        },
        errors: []
    };


    onInputChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.setState(prevState => {prevState.payload[name] = value; return prevState;});
    };


    submit = () => {
        Services.login(this.state.payload)
            .then(this.onThen)
            .catch(this.onCatch);
    }


    onThen = (response) => {
        this.props.app.setState(prevState => {prevState.userData = response; prevState.isLoggedIn = true; return prevState;});
        Toast.renderToast("success", "Login Successful");
        this.setError([]);
    }


    onCatch = (response) => {
        this.setError(response.response.data.errors);
        Toast.renderToast("error", "Login Failure");
    }


    setError = (errors) => {
        this.setState(prevState => {prevState.errors = errors; return prevState;});
    }

  render() {
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
                onChange={this.onInputChange}
                value={this.state.payload.email}
                />
            </div>
            
            <div className="form-input">
                <input 
                type="password" 
                className="form-control" 
                placeholder="Password" 
                name="password" 
                onChange={this.onInputChange}
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
                onClick={this.submit}
                >
                    Sign in
                </button>

            </div>
            
        </form>

        {this.state.errors.map((error, i) => {return <p key={"uniqueId"+i}>{error}</p>})}

      </React.Fragment>
    );
  }
}

export default Login;
