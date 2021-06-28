import React from "react";
import "../HomeStyle/Home.scss";
// import * as userServies from "../../../services/UserService"

class Register extends React.Component {
    render() {
        return (
            <>
                <div>HA HA</div>
                <div className="text">
                    <p>It's like you've wated your entire week</p>
                </div>
                <form>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="John"
                        />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Doe"
                        />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="password confirmation"
                        />
                        <label htmlFor="floatingPassword">
                            passwordConfirm
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="http://www.yourbestself.you"
                        />
                        <label htmlFor="floatingInput">User Image</label>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary">
                            Register
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default Register;
