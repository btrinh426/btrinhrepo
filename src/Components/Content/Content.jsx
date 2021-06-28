import React from 'react';


class Content extends React.Component{
  onButtonClicked1 = (e) =>{
    this.props.history.push("/Login")
}

render(){
  return(
         
    <div style={{ padding: '10rem'}}>
          <div className="container">
              <h1>Content</h1>
              <h4>
              This is a page Devoid of Content
              <button className="btn btn-secondary" onClick={this.onButtonClicked1}>
                            Change Content &raquo;
                          </button>
              </h4>
          </div>
          </div>
    )
  }
}

export default Content;