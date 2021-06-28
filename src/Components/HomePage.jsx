import React from "react";
import Login from "./Login";
import Register from "./Register";

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Login {...this.props} />
        <Register />
      </React.Fragment>
    );
  }
}

export default HomePage;

// import React from 'react'

// class HomePage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.login = this.login.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.signup = this.signup.bind(this);
//         this.state = {
//           email: '',
//           password: ''
//         };
//       }

//     handleChange(e) {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//     }

//     login(e) {
//         e.preventDefault();

//     }

//     signup(e){
//         e.preventDefault();

//     }

//     render() {
//         return (
//         <div className="m-container">
//             <h1>Login</h1>
//             <hr/>
//             <div className="m-container">
//                 <form onSubmit={this.submitForm}>
//                 <div>
//                     <label htmlFor="exampleInputEmail1">Email address: </label>
//                     <br/>
//                     <input
//                     value={this.state.email}
//                     onChange={this.handleChange}
//                     type="text"
//                     name="email"
//                     id="exampleInputEmail1"
//                     placeholder="you@email.com" />
//                 </div>
//                 <div>
//                     <label htmlFor="exampleInputPassword1">Password: </label>
//                     <br/>
//                     {/* Margin issue when showing and hiding password */}
//                     <input
//                     value={this.state.password}
//                     onChange={this.handleChange}
//                     type="password"
//                     name="password"
//                     id="exampleInputPassword1"
//                     placeholder="**********"
//                      />
//                 </div>
//                 <br/>
//                 <button
//                     type="submit"
//                     className="button"
//                     onClick={this.login}
//                     onSubmit={this.handleSubmit}>Login</button>
//                 &nbsp;
//                 <button className="button-inv" to="/register">Register</button>
//                 </form>
//             </div>
//         </div>
//         );
//     }
// }

// export default HomePage
