// import { get } from "jquery";
import React from "react";
import * as loginServices from "../services/loginServices";

class Content extends React.Component{

    // handleClick =(e)=>{
    //     e.preventDefault();
    //     console.log("Hello!");   
    // }

    componentDidMount(){
        this.onClickButton();
        console.log("Yes!");
    };
        
    onClickButton =()=>{
        const data = {email: "janedoe@example.com", password: "Janedoe!1", tenantId: "U01U83Z77D5"};
    
        loginServices.logIn(data)
            .then(this.onLogInSuccess)
            .catch(this.onLogInError);
    };
    
    onLogInSuccess =(response)=>{
        console.log(response);
    };
    
    onLogInError=(response)=>{
        console.error({"error":response});
    };

    render(){
        return(
            <React.Fragment>
                 <div className="container">
                    <div>
                        <button 
                        className="btn btn-secondary"
                        onClick = {this.onClickButton}>
                            Click Me!
                        </button>
                    </div>
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
                                <button className="btn btn-secondary">
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
                            <button className="btn btn-secondary">
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
                            <button className="btn btn-secondary">
                                View details &raquo;
                            </button>
                            </p>
                         </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Content;