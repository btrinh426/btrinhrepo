import React from "react";

class NewTemplate extends React.Component {
    constructor(props) {   //<--- setting initial state here state
        super(props);
        this.state = { name: "Andrew" }
    }





    render() {            //----mounting (mounted on DOM and rendered for the first time on webpage)

        return (

            <div>Template</div>
        )
    }

}

export default NewTemplate;
