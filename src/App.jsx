import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Register from "./components/Register";
import ProductForm from "./components/ProductForm";

//import SomeComponent from "./components/SomeComponent";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <SiteNav {...this.props} />
        <main role="main">
          <div className="container mt-5">
            <Route path="/Register" exact={true} component={Register}></Route>
          </div>
          <div>
            <ProductForm />
          </div>
        </main>
      </>
    );
  }
}

export default App;

/* <Router>
         <React.Fragment>
        <div>
           <NavLink to="/SiteNav">
               <button */
//           type="button"
//           className="link-button navbar-brand"
//           onClick={this.onButtonClicked}
//         >
//           SiteNav
//         </button>
//       </NavLink>
//       <Route path="/SiteNav" exact={true} component={SiteNav}></Route>
//     </div>

//     <div>
//       <NavLink to="/Jumbo">
//         <button
//           type="button"
//           className="link-button navbar-brand"
//           onClick={this.onButtonClicked}
//         >
//           Jumbotron
//         </button>
//       </NavLink>
//       <Route path="/Jumbo" exact={true} component={Jumbo}></Route>
//     </div>

//     <div>
//       <NavLink to="/Content">
//         <button
//           type="button"
//           className="link-button navbar-brand"
//           onClick={this.onButtonClicked}
//         >
//           Content
//         </button>
//       </NavLink>
//       <Route path="/Content" exact={true} component={Content}></Route>
//     </div>

//     <div>
//       <NavLink to="/Footer">
//         <button
//           type="button"
//           className="link-button navbar-brand"
//           onClick={this.onButtonClicked}
//         >
//           Footer
//         </button>
//       </NavLink>
//       <Route path="/Footer" exact={true} component={Footer}></Route>
//     </div>
//   </React.Fragment>
// </Router>
