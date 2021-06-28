import React, { Component } from 'react';
import Swal from 'sweetalert2';
import * as userService from '../services/userService';

let id = 5807;

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    }

    // componentDidMount() {
    //      let data = {
    //         "email": "umyadash@example.com",
    //         "password": "Password1!",
    //         "tenantId": "5809"
    //       };

    //     userService.login(data)
    //         .then(this.onActionSuccess)
    //         .catch(this.onActionErr);
    // }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let val = e.target.value;

        this.setState(prevState => {
           let user = {...prevState.user}
           user[name] = val;
           return {user}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state.user;

        data.avatarUrl = "https://api.remotebootcamp.dev/apihelp/rbclogo.png";
        data.tenantId = id++;

        console.log('SignUp data: ',this.state.user);

        userService.register(data)
         .then(this.onActionSuccess)
         .catch(this.onActionErr);

         localStorage.setItem('user', JSON.stringify(this.state.user))
         console.log('storage  ', JSON.parse(localStorage.getItem('user'))) 

         this.setState({
             user: ''
         });
    }

    onActionSuccess = res => {
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        )
        this.props.history.push('/');
    }    

    onActionErr = errResponse => {
        console.log(errResponse)
        Swal.fire(
            'Sorry! Invalid Credentials.',
            'Please check your info and try agian.',
            'error'
        )
    }
    
    render() {
        return (
            <main className="container">
                <h1 className="center">Hi! Where so glad to have you.</h1>
                <form onSubmit={this.handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            id="firstName"
                            value={this.state.user.firstName || ''}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            id="lastName"
                            value={this.state.user.lastName || ''}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.user.email || ''}
                            className="form-control"
                            id="email"
                            onChange={this.handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password1"
                            name="password"
                            value={this.state.user.password || ''}  
                            onChange={this.handleChange}  
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={this.state.user.passwordConfirm || ''}
                            onChange={this.handleChange}   
                        />
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        )
    }
}

export default Signup;
