import React, { Component } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { logIn } from "../services/userServices"; 

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onButtonClick(e){
        logIn({
            email: this.state.email, 
            password: this.state.password 
        }).then(() => {
            console.log("Sucess Login")
            toast("Login Successful!", {
                className: "Success-toast",
                draggable: true,
                position: toast.POSITION.TOP_CENTER
            })
            this.props.history.push("/homepage")
        }).catch((error) => {
            console.log(error)
            if (error) {
                toast("Login Unsuccessful. Please try again.", {
                    className: "error-toast",
                    draggable: true,
                    position: toast.POSITION.TOP_CENTER
                })
            }    
        })
    }  

    onRegisterClick= () => {
        this.props.history.push("/Registration")
    }

    onInputChange (e) {
        const stateObj = {}
        stateObj[e.currentTarget.id] = e.currentTarget.value
        this.setState(stateObj)
    }


    render() {
        return (
            <div className="col-md-4 offset-md-4">
                <div>
                    <div className="header">
                        <h1>Welcome</h1>
                        <p>Sign in to continue</p>
                    </div>
                    <form className="px-4 py-3">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter Email"
                                onChange={this.onInputChange.bind(this)}>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                onChange={this.onInputChange.bind(this)}>
                            </input>
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="check"></input>
                                <label className="form-check-label" htmlFor="check">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>Login</button>
                    </form>
                    <div className="dropdown-divider"></div>
                    <button type="button" className="btn btn-primary" onClick={this.onRegisterClick}>Register Now</button>
                </div>
            </div>
        )
    }
}

export default Login