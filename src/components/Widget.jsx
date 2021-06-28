import React from "react";
import * as userService from "../services/userService"

class Widget extends React.Component {
    state = {
        formData: {
            id: "",
            name: ""
        }
    }

    componentDidMount() {
        console.log("working");
    }

    handleWidget = (e) => {
        e.preventDefault();
        userService.createWidget(this.state.formData)
            .then(this.onCreateEntitySuccess)
            .catch(this.onCreateEntityError);


    }
    onCreateEntitySuccess = (response) => {
        console.log("update successful")
    }

    onCreateEntityError = (errResponse) => {
        console.error("update error")
    }


    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let newState = { ...this.state.formData };

            newState[inputName] = newValue;

            console.log("newState", newState.title, { newState });

            return { formData: newState };
        })
    }

    render() {

        return (
            <div className="col-md-3">
                <form>
                    <h1>Add Sport</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputTitle" >
                            Create Widget
                        </label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.name}
                            placeholder="Enter a name"

                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleWidget}>Submit</button>

                </form>
            </div>

        )
    }
}

export default Widget;