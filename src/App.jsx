// import React, { Component } from "react";
// import SingleCar from "./SingleCar";
// import Cars from "./Cars";
// // import React from 'react';
// import Select from 'react-select';

// const Year = [
//   { label: 'Show All', value: 'All' },
//   { label: '2021', value: '2021' },
//   { label: '2020', value: '2020' },
//   { label: '2019', value: '2019' },
// ];

// function App() {
//   return (
//     <div className="App">
//       <Select
//         options={Year}
//       />
//     </div>
//   );
// }

// export default App;

// // import Nav from "./services/SiteNav";
// // import Footer from "./Footer";
// // import Register from "./Register";
// // import Login from "./LoginPage";
// // import Home from "./Home";
// // import AddContact from "./AddFriend";
// // import * as userService from "./services/userService";
// // import { withRouter } from "react-router-dom";
// // import { Route } from "react-router-dom";
// // import GetFriends from "./getFriends";
// // import SingleFriend from "./SingleFriend";
// // import AddJob from "./AddJob";
// // import Jobs from "./Jobs";
// class App extends Component {
//   componentDidMount() {
//     const data = {
//       email: "user@google.com",
//       password: "Reactpassword123!",
//       tenantId: "bootcamp2",
//     };
//     const payload = data;
//     userService
//       .login(payload)
//       .then(this.onLogInSuccess)
//       .catch(this.onLogInError);
//   }
//   onLogInSuccess = () => {
//     console.log("Login Success @", new Date());
//   };
//   onLogInError = (err) => {
//     console.error(err);
//   };
//   componentDidUpdate(prevProps) {
//     let currentPath = this.props.location.pathname;
//     let prevPath = prevProps.location.pathname;
//     console.log("App", { currentPath, prevPath });
//   }
//   render() {
//     return (
//       <React.Fragment>
//         {/* <Nav /> */}
//         {/* <AddJob {...this.props}/>
//         <Jobs {...this.props}/> */}
//         <AddContact {...this.props} />
//         <GetFriends {...this.props} /> 
//         <Register {...this.props} />
//         {/* <Home {...this.props} /> */}
//         <Login {...this.props} /> 
//         <div className="row m-3">
//           <Route path="/login" exactly={true} component={Home}></Route>
//           {/* <Route
//             path="/register/:userName"
//             exact={true}
//             render={(props) => <Home userName={props.match.params.userName} />}
//           ></Route> */}
//           {/* <Route
//             path="/friends"
//             exact={true}
//             component={GetFriends}
//           ></Route> */}
//           <Route
//             path="/logout"
//             exact={true}
//             component={Login}
//           ></Route>
//           <Route
//             path="/friends/:id(\d+)"
//             exact={true}
//             component={AddContact}
//           ></Route>
//           {/* <Route
//             path="/friends/add"
//             exact={true}
//             component={AddContact}
//           ></Route> */}
//         </div>
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }
// export default withRouter(App);

// ^^^^^^^^^^ was normal 


import React, { Component } from "react";
// import Nav from "./SiteNav/SiteNav";
// import Footer from "./footer/Footer";
// // import Register from "./Register/Register";
// import Login from "./Login/Login";
// import Home from "./Home/Home";
// // import AddContact from "./Friends/AddFriend";
// import * as userService from "./services/userService";
import { withRouter } from "react-router-dom";
// import { Route } from "react-router-dom";
// import GetFriends from "./Friends/GetFriends";
// import SingleFriend from "./Friends/SingleFriend";
// import AddCompany from "./Companies/AddCompany";
// import Companies from "./Companies/Companies";
// import AddJob from "./Jobs/AddJob";
// import Jobs from "./Jobs/Jobs";
import Cars from './Cars/Cars';
import SingleCar from './Cars/SingleCar';
class App extends Component {
  componentDidMount() {
    const data = {
      email: "user@google.com",
      password: "Reactpassword123!",
      tenantId: "bootcamp2",
    };
    // const payload = data;
    // userService
    //   .login(payload)
    //   .then(this.onLogInSuccess)
    //   .catch(this.onLogInError);
  }
  onLogInSuccess = () => {
    console.log("Login Success @", new Date());
  };
  onLogInError = (err) => {
    console.error(err);
  };
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let prevPath = prevProps.location.pathname;
    console.log("App", { currentPath, prevPath });
  }
  render() {
    return (
      <React.Fragment>
        {/* <Nav /> */}
        {/* <AddCompany {...this.props}/>
        <Companies {...this.props}/>
        <AddJob {...this.props} /> */}
        {/* <AddContact {...this.props} />
        <GetFriends {...this.props} />  */}
        {/* <Register {...this.props} />
        <Home {...this.props} />
        <Login {...this.props} />  */}
        <Cars {...this.props} />
        <SingleCar {...this.props}/>
        {/* <div className="row m-3">
          <Route path="/login" exactly={true} component={Home}></Route>
          <Route
            path="/register/:userName"
            exact={true}
            render={(props) => <Home userName={props.match.params.userName} />}
          ></Route> */}
          {/* <Route
            path="/friends"
            exact={true}
            component={GetFriends}
          ></Route>
          <Route
            path="/logout"
            exact={true}
            component={Login}
          ></Route>
          <Route
            path="/jobs"
            exact={true}
            component={Jobs}
          ></Route> */}
          {/* <Route
            path="/friends/:id(\d+)"
            exact={true}
            component={AddContact}
          ></Route>
          <Route
            path="/friends/add"
            exact={true}
            component={AddContact}
          ></Route> */}
        {/* </div> */}
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}
export default withRouter(App);