import React, { Component } from "react";
import Types from "./Types";
import debug from "sabio-debug";

const _logger = debug.extend("Type"); //sabio:Type
// const _loggerPage = debug.extend("Student"); //Sabio:App:Student


class Type extends Component {
    state = {
        name: "John Doe",
        age: 30,
        hasCar: true,
    };

    logAge = () => {
        _logger(this.state.age);
    }

    render() {
        _logger("Say Logger");
        return (
            <>
            <Types 
                name={this.state.name}
                age={this.state.age}
                hasCar={this.state.hasCar}
                logAge={this.logAge}
            />
            </>
        );
    }
}

export default Type;