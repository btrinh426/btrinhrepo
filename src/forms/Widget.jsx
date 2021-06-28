import React from "react";
import * as userService from "../services/userService";




class Widget extends React.Component{
    state = {
        formData: {
        name: "", 
        manufacturer : "", 
        description : "",
        cost: "",
    },
    id: {idNumber: ""}
    };


    onFormFieldChange = (e) =>
{
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;


    this.setState( () =>
    {

        let formData = {...this.state.formData};

        formData[inputName] = newValue;

        return {formData};
    }


    )

    

}

addButtonClicked = (e) =>
    {
        e.preventDefault();
        
       
        
        userService.addCar(this.state.formData)
        .then(this.onAddCarSuccess)
        .catch(this.onAddCarError);
       
    }
    
    onAddCarSuccess = (response) => {
          console.log(response.data.item) 
        
          let incomingIdNumber = response.data.item;
          
          
          
          this.setState( () =>
          {

            let upDatedIdNumber = {...this.state.id}
          
            upDatedIdNumber.idNumber = incomingIdNumber;
            
            let id = {id: upDatedIdNumber}

            return id


          })}
     
          onAddCarError= (response) => {
    
      console.warn({ error: response });
    
    
    }

    render(){
        let styles = {
            marginRight: '520px',
            marginLeft: '480px'
            
        }

        let titleStyles = {
            marginRight: '500px',
            marginLeft: '520px',
            marginTop: '10px'
          };
        return (<React.Fragment>        
            <h1 style={titleStyles}>React Form Challenge!</h1>);
            <form style={styles}>
            <div className="col-auto" >
              <label className="visually-hidden"  htmlFor="autoSizingInput">Name</label>
              <input 
              type="text" 
              className="form-control" 
              style={{marginBottom: 10}} 
              onChange={this.onFormFieldChange}
              value={this.state.formData.name} 
              name="name"
              id="name" 
              />
            
              <label className="visually-hidden" htmlFor="autoSizingInput">Manufacturer</label>
              <input 
              type="text" 
              className="form-control" 
              style={{marginBottom: 10}} 
              onChange={this.onFormFieldChange}
              value={this.state.formData.manufacturer} 
              name="manufacturer"
              id="manufacturer" 
              />
            
              <label className="visually-hidden" htmlFor="autoSizingInput">Description</label>
              <input 
              type="text" 
              className="form-control" 
              style={{marginBottom: 10}} 
              onChange={this.onFormFieldChange}
              value={this.state.formData.description} 
              name="description"
              id="description" 
              />
           
              <label className="visually-hidden" htmlFor="autoSizingInput">Cost</label>
              <input 
              type="text" 
              className="form-control" 
              style={{marginBottom: 10}} 
              onChange={this.onFormFieldChange}
              value={this.state.formData.cost} 
              name="cost"
              id="cost" 
              />
            
             <h1>Car ID Number: {this.state.id.idNumber}</h1>
              <button type="submit" className="btn btn-success" style={{marginTop: 5}} onClick={this.addButtonClicked}>Add Car!</button>
            </div>
          </form>
            </React.Fragment>);
    }
} 


















export default Widget;