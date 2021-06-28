import React from 'react';
import Form from "../Form/Form";
import { BrowserRouter, Route, NavLink } from "react-router-dom";




class Content extends React.Component{
    onButtonClicked1 = () =>{
        console.log("Number One");
    }
    onButtonClicked2 = () =>{
        console.log("Number Two");
    }
    onButtonClicked3 = () =>{
        console.log("Number Three");
    }
    onButtonClicked4 = () =>{
        console.log("All of these buttons do something");
    }

    render(){
        return(
            <main role="main">
            <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum
                  nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
                </p>
                <p>
                  <button className="btn btn-secondary" onClick={this.onButtonClicked1}>
                    View details &raquo;
                  </button>
                </p>
              </div>
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum
                  nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
                </p>
                <p>
                  <button className="btn btn-secondary" onClick={this.onButtonClicked2}>
                    View details &raquo;
                  </button>
                </p>
              </div>
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>
                  Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                  egestas eget quam. Vestibulum id ligula porta felis euismod
                  semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                <p>
                  <button className="btn btn-secondary" onClick={this.onButtonClicked3}>
                    View details &raquo;
                  </button>
                </p>
              </div>
            </div>
            <div className="row">
                    <div className="col-md-12">
                        <h2>New Button</h2>
                        <button className="btn btn-secondary" onClick={this.onButtonClicked4}>New Button</button>
                    </div>
                    <BrowserRouter>
              
                    <div className="col-md-12">
                      <NavLink to="/form">
                      <h2>Go To Other</h2>
                      </NavLink>
                    </div>
                    <div>
                    <Route path="/form" exact={true} component={Form}></Route>
                    </div>
                    
                    </BrowserRouter>
                    </div>
                <div className = "container">
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-danger">
                      Delete Something
                    </button>
                  </div>
                </div>
                
            <hr />
          </div>
          </main>
        )
    }
}
export default Content;