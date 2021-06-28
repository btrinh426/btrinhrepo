// import React from "react";
// import * as userService from "../services/userServices";

// class CarRegister extends React.Components
// {
// state={
//     formData:{
//         Name: "",
//  Manufacturer: "",
//  Description: "",
//  Cost:"",
//  tenantId: "U01G28Q3KHN",
//     }
//     };
//     onClickHandler = () => {
//       userService
//         .Register(this.state.formData)
//         .then(this.onRegisterSuccess)
//         .catch(this.onRegisterError);
//     };
//     onRegisterSuccess = () => {
//       alert("Entity was created");
//     };
//     onRegisterError = () => {
//       alert("Error");
//     };
//     onFormFieldChanged = (e) => {
//       let currentTarget = e.currentTarget;
//       let newValue = currentTarget.value;
//       let inputName = currentTarget.name;

//       this.setState(() => {
//         let formData = { ...this.state.formData };
//         formData[inputName] = newValue;
//         return { formData };
//       });
//     };
//     render(){
//         return(
//             <React.Fragment>
//                 <form>
//   <div className="mb-3">
//     <label HtmlFor="exampleInputName1" className="form-label">Name</label>
//     <input type="name" className="form-control" id="name" aria-describedby="namehelp"/>
//     <div id="name" className="form-text">
//     onChange={this.onFormFieldChanged}
//     value={this.state.formData.name}
//     </div>
//   </div>
//   <div className="mb-3">
//     <label HtmlFor="exampleInputManfacturer1" className="form-label">Manufacturer</label>
//     <input type="manufacturer" className="form-control" id="manufacturer"/>
//     onChange={this.onFormFieldChanged}
//     value={this.state.formData.manufacturer}
//   </div>
//   <div className="mb-3">
//     <label HtmlFor="exampleInputDescription1" className="form-label">Description</label>
//     <input type="description" className="form-control" id="description"/>
//     onChange={this.onFormFieldChanged}
//     value={this.state.formData.description}
//   </div>
//   <div className="mb-3">
//     <label HtmlFor="exampleInputCost1" className="form-label">Cost</label>
//     <input type="Cost" className="form-control" id="Cost"/>
//     onChange={this.onFormFieldChanged}
//     value={this.state.formData.description}
//   </div>
//   <p>
//                 <button
//                   className="btn btn-primary btn-lg"
//                   onClick={this.onClickHandler}
//                 >
//                   Submit &raquo;
//                 </button>
//               </p>
// </form>
//             </React.Fragment>
//         );
//     }
// }

// export default CarRegister;
