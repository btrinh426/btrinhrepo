import React from "react";
import SimpleNavBar from "./navbarsimple";
import * as Assessment from "../services/userService"
import { toast } from "react-toastify";

class Products extends React.Component {
    state = { id: new Date() }

    newDataEntered = e => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => { return { ...prevState, [name]: value } })
    }

    onSubmitClicked = (e) => {
        e.preventDefault();
        let data = this.state;
        Assessment.assessment1(data).then(this.onSuccess).catch(this.onError)
    }

    onSuccess = () => toast.success(`YAY! Your ID number is: ${this.state.id}`)

    onError = () => toast.error("NOOOOOOO")

    render() {
        return <React.Fragment key={this.state.id}>
            <SimpleNavBar />
            <div className="container">
                <div className="row" />
                <div className="row">
                    <div className="col">
                        <h3 className="loginText p-1"><strong>Info Gathering</strong></h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Product Name:</label>
                                <input onChange={this.newDataEntered} value={this.state.name} type="text" id="name" name="name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="manu">Product Manufacturer:</label>
                                <input onChange={this.newDataEntered} value={this.state.manu} type="text" id="manu" name="manu" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc">Product Description:</label>
                                <input onChange={this.newDataEntered} value={this.state.desc} type="text" id="desc" name="desc" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cost">Product Cost: (no decimals)</label>
                                <input onChange={this.newDataEntered} value={this.state.cost} type="number" id="cost" name="cost" className="form-control" />
                            </div>
                        </form>
                        <button onClick={this.onSubmitClicked}>Submit the New Product!</button>
                    </div>
                </div>
                <div className="row" />
            </div>
        </React.Fragment>
    }
}

export default Products;