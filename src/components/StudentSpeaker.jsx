import React from "react";

function StudentSpeaker (props){

 console.log(props)
    return(

        <div className="container">
            <h1> Code Talk by {props.firstName} {props.lastName}</h1>
        </div>
    )
}

export default StudentSpeaker;