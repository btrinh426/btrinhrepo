// // import React from "react";
// // // import service from "../services/userService";
// // import SinglePres from "./SinglePres";

// class Presidents extends React.Component {
//   state = {
//     name: ["George Washsington", "John Adams", "Thomas Jefferson"],
//   };

//   componentDidMount() {
//     // this.setState((preState) => {
//     //   return { mappedPresidents: preState.presidents.map(this.mapPresident) };
//     // });

//     service.getPresidents().then(this.onGetSuccess).catch(this.onGetError);
//   }

//   onGetSuccess = (response) => {
//     console.log(response);
//   };
//   onGetError = (err) => {
//     console.error(err);
//   };

//   onPresClick = (e) => {
//     console.log(e.currentTarget.dataset);
//     console.log(e.currentTarget.dataset.presId);
//   };

//   onPresClickFull = (pres) => {
//     console.log(pres);
//   };

//   mapPresident = (onePresident) => {
//     return (
//       <React.Fragment key={`Presidents-${onePresident.id}`}>
//         <SinglePres
//           president={onePresident}
//           onClick={this.onPresClickFull}
//         ></SinglePres>
//       </React.Fragment>
//     );
//   };

//   mapPresidentSimple = (onePresident) => {
//     return <p key={`Presidents-${onePresident.id}`}>{onePresident.nm}</p>;
//   };

//   render() {
//     return (
//       <div className="col-md-12 p-5">
//         <h1>Presidents</h1>
//         <hr />
//         <div className="row">
//           {/* {this.state.presidents.map(this.mapPresident)} */}
//           {this.state.mappedPresidents}
//         </div>
//       </div>
//     );
//   }
// }

// export default Presidents;
