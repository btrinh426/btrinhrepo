import React from"react"
//  import ClickApp from "./ClickHandler"
 import ClickApp from "../App"
 import {BrowserRouter, Route, NavLink} from "react-router-dom";

function sayHello() {
    // alert("The link was clicked.");
    console.log("The link was clicked.");
  }


class BJumoIntro extends React.Component
{  
    
      
    render()
    {        
     
        return (
            

            <React.Fragment>                    

          <main role="main">
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Hello, world!</h1>
              <p>
                This is a template for a simple marketing or informational
                website. It includes a large callout called a jumbotron and
                three supporting pieces of content. Use it as a starting point
                to create something more unique. 
                
              </p>
              
              <p>
                <button className="btn btn-primary btn-sm">
                  Learn more &raquo; </button>
                  
              </p>
              <span>                
                
                <button className="btn btn-primary btn-md"  onClick={sayHello}>Clicker Handle</button> 
                </span>
               
              <div style={{
    paddingTop: '8px'}}><button  className="btn btn-success btn-md" ><NavLink  to="/">Home Test </NavLink></button></div>
            </div>
            
          </div>
          
          </main>

          

</React.Fragment>

        );
    }
}

export default BJumoIntro;