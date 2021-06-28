// import React from "react";
// import { NavLink } from "react-router-dom";

// class Homepage extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={

//   };

//   componentDidMount(){
//   userService
//       .currUser(id)
//       .then(this.oncurrUserSuccess)
//       .catch(this.oncurrUserError);
//   };

//   onCurrUserSuccess = (response) => {

//   };

//   onCurrUserError = (response) => {

//   };

//   userService
//       .userById(id)
//       .then(this.onUserByIdSuccess)
//       .catch(this.onUserByIdError);
//   };

//   onUserByIdSuccess = (response) => {

//   };

//   onUserByIdError = (response) => {

//   };
// }

//   render(){
//     return (
//       <div>
//         <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
//           <button className="link-button navbar-brand">Home</button>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarsExampleDefault"
//             aria-controls="navbarsExampleDefault"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarsExampleDefault">
//             <ul className="navbar-nav mr-auto">
//               <NavLink className="nav-link link-button" to="/jumbo">
//                 Friends
//               </NavLink>

//               <li className="nav-item">
//                 <NavLink className="nav-link link-button" to="/content">
//                   Blogs
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link link-button" to="/register">
//                   Tech Companies
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link link-button" to="/login">
//                   Jobs
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link link-button" to="/login">
//                   Jobs
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link link-button" to="/login">
//                   Events
//                 </NavLink>
//               </li>
//             </ul>
//             <form className="form-inline my-2 my-lg-0">
//               <input
//                 className="form-control mr-sm-2"
//                 type="text"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button
//                 className="btn btn-outline-success my-2 my-sm-0"
//                 type="submit"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </nav>

//         <h1>Welcome</h1>
//         <h1>Status:{this.props.loggedInStatus}</h1>
//       </div>
//     );
//   }

// export default Homepage;
