import React from "react";
import * as userService from "../services/userService";



class Friends extends React.Component {
  state = {
    formData: {
    title: "", 
    bio: "", 
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: ""
}
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
        
       
        
        userService.addFriend(this.state.formData)
        .then(this.onAddButtonClickedSuccess)
        .catch(this.onAddButtonClickedError);
       
    }
    
    onAddButtonClickedSuccess = (response) => {
          console.log(response.data) }
     
    onAddButtonClickedError= (response) => {
    
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
    

        return (
        <React.Fragment>        
        <h1 style={titleStyles}>Add Your Friends!</h1>);
        <form style={styles}>
        <div className="col-auto" >
          <label className="visually-hidden"  htmlFor="autoSizingInput">Name</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.title} 
          name="title"
          id="title" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Bio</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.bio} 
          name="bio"
          id="bio" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Summary</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.summary} 
          name="summary"
          id="summary" 
          />
       
          <label className="visually-hidden" htmlFor="autoSizingInput">Headline</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.headline} 
          name="headline"
          id="headline" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Slug</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.slug} 
          name="slug"
          id="slug" 
          />

          <label className="visually-hidden" htmlFor="autoSizingInput">Primary Image</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.primaryImage} 
          name="primaryImage"
          id="primaryImage" 
          />
        
          <button type="submit" className="btn btn-success" style={{marginTop: 5}} onClick={this.addButtonClicked}>Add!</button>
        </div>
      </form>
        </React.Fragment>
        )
    }
}



















export default Friends;