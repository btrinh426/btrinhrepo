import React from"react";

function ClickApp() {

    function sayHello() {
      alert('Hello!');
      console.log("The link was clicked.");
    }
    
    return ({sayHello}
    //   <button onClick={sayHello}>
    //     Click me!
    //   </button>
    );
  }
  
  export default ClickApp;