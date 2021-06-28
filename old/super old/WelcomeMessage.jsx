import React from "react";

function WelcomeMessage(props)
{
    let end = <strong>Today</strong>
    let now = new Date().getSeconds()
    return (
        <React.Fragment>
    <strong>Hi there {props.user.firstName}, thanks for coming {end}.</strong>
    <div>{props.extra}</div>
    <div>{props.end}</div>
    <div>{now}</div>
    </React.Fragment>
    )
}

export default WelcomeMessage;