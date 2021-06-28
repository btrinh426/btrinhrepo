import React from "react"      

class Content extends React.Component{
    
    onClicked = () =>{
        console.log("I was clicked")
    }
    render(){
        return (
        <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>The Nina</h2>
                <p>
                
                </p>
                <p>
                  <button className="btn btn-secondary">
                    View details &raquo;
                  </button>
                </p>
              </div>
              <div className="col-md-4">
                <h2>The Pinta</h2>
                <p>
                  
                </p>
                <p>
                  <button className="btn btn-secondary">
                    View details &raquo;
                  </button>
                </p>
              </div>
              <div className="col-md-4">
                <h2>My Button</h2>
                <p>
                  This should log a click
                </p>
                <p>
                  <button className="btn btn-primary btn-lg" onClick={this.onClicked}>
                    Click Here &raquo;
                  </button>
                </p>
              </div>
              <div className="col-md-4">
                <h2>{"& The Santa Maria"}</h2>
                <p>
    
                </p>
                <p>
                  <button className="btn btn-secondary">
                    View details &raquo;
                  </button>
                </p>
              </div>
            </div>
        </div>
        )
    }
}        

export default Content 