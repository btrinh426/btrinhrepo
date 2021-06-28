import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as userService from '../services/userService';
// import * as response from '../components/response';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                password: '',
                tenantId: ''
            }
        }
    }

    handleChange = e => {
        e.preventDefault();
        let name = e.target.name;
        let val = e.target.value;
        
        this.setState(prevState => {
            let user = {...prevState.user};
            user[name] = val;

            return {user}
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        let data = this.state.user;
        let storedUser = JSON.parse(localStorage.getItem('user'))
        
        if (storedUser.email === data.email) {
            // console.log('storedUser ',storedUser.firstName)
            this.props.setCurrentUser(storedUser)

        }

        userService.login(data)
            .then(this.onActionSuccess)
            .catch(this.onActionErr)   
        
        
        return (<Redirect to='/' />);
    }

    onActionSuccess = res => {
        console.log('response ',res)
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        )
      this.props.history.push('/')
    }

    onActionErr = errResponse => {
        console.log('errResponse ',errResponse)
        Swal.fire(
            'Sorry! Invalid Credentials.',
            'Please check your info and try agian.',
            'error'
        )
    }
    

    render() {
        return (
            <main className="container">
                {/* {console.log(this.props)} */}

                <h1>Welcome back!</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="*Email"
                            value={this.state.user.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control" 
                            id="password"
                            name="password"
                            placeholder="*Password"
                            value={this.state.user.password}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tenantId"
                            className="form-control"
                            id="tenantId"
                            name="tenantId"
                            placeholder="*tenantId"
                            value={this.state.user.tenantId}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        )
    }   
}

export default Login;
