import React from 'react'
import EventHandler from "../../scripts/eventHandler"

class TextInput extends React.Component {
    //Needs these props
    //name --- placeholder --- getFormState --- setFormState --- formObjPath

    constructor(props) {
        super(props)
        this.onFormChange = this.onFormChange.bind(this)
    };

    onFormChange(e){
        const newState = EventHandler.inputOnChange(e, this.props.formObjPath, {... this.props.getFormState});
        this.props.setFormState(newState);
    }

    getPropertyFromPath(obj, path){
        let objCopy = obj;
        for(let i = 0; i < path.length; i++){
            objCopy = objCopy[path[i]];
        }
    
        return objCopy;
    }

    arrayAdd(array, valueToAdd){
        array.push(valueToAdd);
        return array;
    }

    render(){
        return (
            <React.Fragment>
            <div className="form-input">
                <input 
                type= "text" 
                className= "form-control"
                placeholder= {this.props.placeholder} 
                name={this.props.name} 
                onChange={this.onFormChange}
                value={this.getPropertyFromPath(this.props.getFormState, this.arrayAdd([... this.props.formObjPath], this.props.name))}
                />
            </div>
            </React.Fragment>
        );
    }
}

export default TextInput;