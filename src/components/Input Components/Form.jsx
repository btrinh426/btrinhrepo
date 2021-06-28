import React from 'react'
import Misc from "../../scripts/misc"
import Services from "../../scripts/services"
import EventHandler from "../../scripts/eventHandler"
import TextInput from "./TextInput"

class Form extends React.Component {

    render(){
        return (
            <form className="form">

            <button 
            name="submit-button" 
            type="button" 
            className="btn btn-primary" 
            onClick={this.onFormSubmit}
            >
            Submit
            </button>

            </form>
        );
    }
}

export default Form;