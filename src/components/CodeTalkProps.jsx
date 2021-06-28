import React from "react";
import StudentSpeaker from "./StudentSpeaker";

function CodeTalkProps (Props){


    return(

        <div className="container">
            <h1> Code Talk Topic: {Props.topic}</h1>
            <StudentSpeaker firstName="Andrew" lastName= "Gutierrez" />
        </div>
    )
}

export default CodeTalkProps;