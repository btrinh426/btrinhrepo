import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addRecord} from "../../services/UserService";


class Form extends React.Component{
  state = {
    formData: { 
    artist: "",
    title: "",
    released: "",
    image: "",
    }  
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue
       
      return { formData };
    })
  }

  onButtonClicked = (e) =>{
    e.preventDefault();
    addRecord(this.state.formData)
    .then(this.onAddRecordSuccess)
    .catch(this.onAddRecordError)
}
onAddRecordSuccess = (response)=>{
  toast.info("Information Submitted", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  console.log(response);
}
onAddRecordError = (errResponse)=>{
  toast.warning("NOT Submitted", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  console.log(errResponse)
}

    render(){
        return(
            <React.Fragment>
            
            
            <div className="container">
            
            <div style={{ marginLeft: '8rem', padding: '8rem' }}> 
            <h5>Add Info Here:</h5>
            
            <form id="formRegister">
              <div className="form-group">
                <label htmlFor="artist">Artist Name</label>
                <input type="text" id="artist" name="artist" className="form-control" placeholder="enter an artist" onChange={this.onFormFieldChanged} value={this.state.formData.artist} />
              </div>
              <div className="form-group"> 
                <label htmlFor="title">Album Title</label>
                <input type="text" id="title" name="title" className="form-control" placeholder="enter the title" onChange={this.onFormFieldChanged} value={this.state.formData.title} />
              </div> 
              <div className="form-group"> 
                <label htmlFor="released">Year Released</label>
                <input type="text" id="released" name="released" className="form-control" placeholder="enter the year it was released" onChange={this.onFormFieldChanged} value={this.state.formData.released} />
              </div>
              <div className="form-group">  
                <label htmlFor="image">Image</label>
                <input id="image" name="image" type="url" className="form-control" placeholder="enter a valid image url" onChange={this.onFormFieldChanged} value={this.state.formData.image} />
              </div>  
                <button id="addRecord" type="submit" className="btn btn-primary mx-6" onClick={this.onButtonClicked}>Submit</button>
              </form>
              </div>
            </div>
            
         
          </React.Fragment>
        )
    }
}
export default Form;