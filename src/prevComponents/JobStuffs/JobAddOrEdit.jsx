import React from 'react'
import Misc from "../../scripts/misc"
import Services from "../../scripts/services"
import EventHandler from "../../scripts/eventHandler"
import Form from '../Input Components/Form'

class JobAddOrEdit extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    };

    state = {
        payload: {
            title: "",
            description: "",
            summary: "",
            pay: "",
            slug: "",
            statusId: "",
            techCompanyId: "",
            skills: ""
        }
    }

    getInputArray(){
        const inputArray = [
            {name: "title", placeholder: "Title"},
            {name: "description", placeholder: "Description"},
            {name: "summary", placeholder: "Summary"},
            {name: "pay", placeholder: "Pay"},
            {name: "slug", placeholder: "Slug"},
            {name: "statusId", placeholder: "StatusId"},
            {name: "techCompanyId", placeholder: "Tech Company Id"},
            {name: "skills", placeholder: "Skills-Seperate With Comma"}
        ];
        return inputArray;
    }

    onSubmit(){

        if(this.props.addOrEdit === "add"){
            const payload = this.state.payload;
            console.log(payload);
        }

        if(this.props.addOrEdit === "edit"){
            const id = Misc.historyToArray(this.props)[2];
            const payload = {... this.state.payload};
            payload.id = id;
            console.log(payload);
        }
    }

    render(){
         return (
            <React.Fragment>
                <Form
                inputArray = {this.getInputArray()}
                getFormState = {this.state}
                setFormState = {p => {this.setState(p)}}
                formObjPath = {["payload"]}
                onFormSubmit = {this.onSubmit}
                ></Form>
            </React.Fragment>
         );
    }
}

export default JobAddOrEdit;