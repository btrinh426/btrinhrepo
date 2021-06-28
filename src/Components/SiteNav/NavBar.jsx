import React from "react";


class Navbar extends React.Component{
render(){
return(

<div className="container">
<div style={{ position: 'sticky' }}>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">  
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
            </ul> 
            <button className="link-button navbar-brand">Sabio Warmup</button>        
        </div>
    </nav> 
    </div>
</div>

        )
    }
}
export default Navbar