import React, {Component} from "react";
import { loginUser } from "../services/usersService";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


class Login extends Component {

    state = {
        formData: {
            email: "",
            password: "",
            tenantId: "U01CDE4FMBM"
        }
    };

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name
        
        this.setState(()=>{
            let formData = {...this.state.formData}

            formData[inputName] = newValue

            return {formData}
        
        })

    };

    onLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const payload = this.state.formData

        loginUser(payload)
            .then(this.onLoginUserSuccess)
            .catch(this.onLoginUserError)
    };

    onLoginUserSuccess = (res) => {
        console.log("LoginUser success", res)

        toast.success("Success! You're logged in.")

        this.props.history.push("/home")

    };

    onLoginUserError = (err) => {
        console.log("LoginUser error", err.response)
    };

    render(){
        return (

            <div>
                <div className="card text-center" 
                    style={{width: "30rem", 
                            marginTop: "30px",
                            marginBottom: "30px",
                            marginLeft: "200px"
                            }}>
                    <div className="card-header" 
                        style={{fontSize: "30px", 
                                fontWeight: "600",
                                backgroundColor: "#4e4e4e",
                                color: "white"
                                }}
                                >Welcome
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">SIGN IN TO CONTINUE</h5>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label"></label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="inputEmail" 
                                        name="email"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.email}
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email"/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="inputPassword" 
                                        name="password"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.password}
                                        placeholder="Enter password"/>
                            </div>
                            <button 
                                type="login" 
                                className="btn btn-primary login" 
                                id="login-button"
                                style={{width: "93%",
                                    marginTop: "1rem",
                                    marginBottom: "2rem"}}
                                onClick={this.onLogin}
                                >Login
                            </button>
                        </form>
                        <h5 className="card-title">Need to Sign Up?</h5>
                        <a 
                            href="/register" 
                            button="true" 
                            type="register" 
                            className="btn btn-light register" 
                            id="register-button"
                            style={{width: "93%",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                backgroundColor: "#efeeee"
                            }}
                            >Register Now</a>
                    </div>    
                </div>
            </div>
                 
        )
    }
};

export default Login;