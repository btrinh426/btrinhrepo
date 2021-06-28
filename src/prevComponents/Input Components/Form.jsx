import React from 'react'
import Misc from "../../scripts/misc"
import Services from "../../scripts/services"
import EventHandler from "../../scripts/eventHandler"
import TextInput from "./TextInput"

class Form extends React.Component {
    //Needs these props
    //inputArray getFormState setFormState formObjPath onFormSubmit
    //inputArray = [{name: "", placeholder: ""}]


    render(){
        return (
            <form className="form">

            {
                this.props.inputArray.map( (inputConf, i) => {
                    return <TextInput key={i} name={inputConf.name} placeholder={inputConf.placeholder} getFormState={this.props.getFormState} setFormState={this.props.setFormState} formObjPath={this.props.formObjPath}></TextInput>
                })
            }

            <button 
            name="submit-button" 
            type="button" 
            className="btn btn-primary" 
            onClick={this.props.onFormSubmit}
            >
            Submit
            </button>

            </form>
        );
    }
}

export default Form;