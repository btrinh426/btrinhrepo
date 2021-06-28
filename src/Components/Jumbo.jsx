import React from "react"

class Jumbo extends React.Component{
    render(){
        return(
        <div className="jumbotron">
         <div className="container">
             <h1 
             className="display-3 ">Welcome to Moviefone!
            </h1>
            <p>
            <button className="btn btn-primary btn-lg">
              Learn more &raquo;
            </button>
            </p>
         </div>
        </div>
        )
    }
}

export default Jumbo 