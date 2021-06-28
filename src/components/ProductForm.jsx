import React from "react";
// import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import * as ProductService from '../services/ProductService';


//***** I cannot seem to get the call to post for some reason, the state data is all changed and the data being passed
//  seems correct but continue to get a 401 unauthorized error even after putting an automatic login hardcoded into
//  the webpage that comes back successfully logged in...Check routes multiple times to no success*****/ 


// **** also there's a lot of code commented out, I realized that i wasnt working in a clone rep so submitting wouldnt work
//  and i had to remove all bootstrap elements and other things to get it to even run again ****//


class Product extends React.Component{
    state = {
        'name': '',
        'manufacturer': '',
        'description': '',
        'cost': ''
    }

    loggedIn= ()=>{
        ProductService.exampleLogin()
            .then(this.onLoggedInSuccess)
            .catch(this.onLoggedInError);
    }

    onLoggedInSuccess = (response) => {
        console.log(response, 'Logged in...');
    }
    
    onLoggedInError= (errResponse) => {
        console.log(errResponse);
    }

    handleFormChange=(e)=>{
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(()=>{
            let newState = {};
            newState[inputName] = newValue;

            return newState;
        });
    }

    handleFormSubmit = () =>{
    
        ProductService.submitForm(this.state)
            .then(this.onFormSubmitSuccess)
            .catch(this.onFormSubmitError);
    }

    onFormSubmitSuccess = (response) => {
        console.log(response.item + ' created');
    }
    
    onFormSubmitError= (errResponse) => {
        console.log(errResponse);
    }

    render(){
        this.loggedIn();
        return(
            
            <>
            <form>
            <label>
                Name:
                <input 
                type="text" 
                name="name" 
                onChange={this.handleFormChange}
                value={this.state.name}  
                />
            </label>
            <label>
            Manufacturer:
                <input 
                type="text" 
                name="manufacturer" 
                onChange={this.handleFormChange}
                value={this.state.manufacturer}
                />
            </label>
            <label>
            Description:
                <input 
                type="text" 
                name="description" 
                onChange={this.handleFormChange}
                value={this.state.description}
                />
            </label>
            <label>
            Cost:
                <input 
                type="text" 
                name="cost" 
                onChange={this.handleFormChange}
                value={this.state.cost}
                />
            </label>
            <input type="button" value="Submit" onClick={this.handleFormSubmit}/>
            </form>
            {/* <MDBRow style={{ justifyContent: 'center'}}>
                <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                    <form>
                        <p className="h4 text-center py-4">Create Product</p>
                        <div className="grey-text">
                        <MDBInput
                            name='name'
                            label="Name"
                            group
                            type="text"
                            onChange={this.handleFormChange}
                            value={this.state.name}
                        />
                        <MDBInput
                            name='manufacturer'
                            label="Manufacturer"
                            group
                            type="text"
                            onChange={this.handleFormChange}
                            value={this.state.manufacturer}
                        />
                        <MDBInput
                            name='description'
                            label="Description"
                            group
                            type="text"
                            
                        />
                        <MDBInput
                            name='cost'
                            label="Cost"
                            group
                            type="text"
                            onChange={this.handleFormChange}
                            value={this.state.cost}
                        />
                        </div>
                        <div className="text-center py-4 mt-3">
                        <MDBBtn 
                        className="blue-gradient" 
                        type="button"
                        onClick={this.handleFormSubmit}>
                            Add Product
                        </MDBBtn>
                        </div>
                    </form>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow> */}
        </>
            
            
    )}
}

export default Product;