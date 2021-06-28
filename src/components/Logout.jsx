// import React from "react";

// import * as appService from "../services/appService";

// class Logout extends React.Component {
//   onLogOutClicked(e) {
//     console.log("log out clicked");
//     this.logOutUser();
//   }
//   logOutUser = () => {
//     appService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
//   };

//   onLogOutSuccess = (response) => {
//     console.log("logOut success");
//     this.props.history.push("/login");
//   };

//   onLogOutError = (errResponse) => {
//     console.log("logOut error");
//   };

//   componentDidMount() {
//     this.logOutUser();
//   }
//   render() {
//     return (
//       <li className="nav-item">
//         <button className="nav-link link-button" onClick={this.onLogOutClicked}>
//           Log Out
//         </button>
//       </li>
//     );
//   }
// }

// export default Logout;
