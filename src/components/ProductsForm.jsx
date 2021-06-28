import React from"react"
import * as userService from "../services/AxiosService"

class ProductForm extends React.Component
{    

    constructor(props) {
        super(props);
        this.state = { 
            gitId: '',
        slackId: '',
        trelloId: '',
        sabioId: '',
        apiId: '',
        linkId: '' };

      }


 textValHandler = (event) => {
let nam = event.target.name;
let val = event.target.value;
    this.setState({[nam]: val});


   }
    passState=(e)=> {
        e.preventDefault();
                console.log("Submit was clicked.");
                userService.userInfo(this.state)
                .then(this.userSubmitSuccess)
                .catch(this.userSubmitError)
      }

      userSubmitSuccess= (result)=> {console.log("Success ",result)};
      userSubmitError=(result)=>console.log("Error ",result);

      editState=(e)=> {
        e.preventDefault();
                console.log("Edit was clicked.");
                // userService.userInfo(this.state)
                // .then(this.userSubmitSuccess)
                // .catch(this.userSubmitError)
      }

    render()
    {        
     
        return (        
                         

                          
<div style={{width:"80%",marginLeft:"40%", float:"center"}} >
<h3 style={{textAlign: 'center',color:"Window"}}>User Information Form:</h3>

<form style={{margin:"auto", width:"60%", border:"2px solid blue",
backgroundColor:"whitesmoke"}}>

<div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridGap: 1,
textAlign: 'center', fontSize:".7rem", marginLeft:"3%" }}>

<div >
<label>GitHub UserName:</label>
<br></br>
  <input type="text" name='gitId' onChange={this.textValHandler} ></input>
   <br></br><br></br>
  
   
  <label htmlFor="slackId">Slack ID:</label>
  <br></br>
  <input type="text" name="slackId" onChange={this.textValHandler}></input>
  </div>
  <hr  style={{width: 2, height: 110, backgroundColor: 'powderblue'}}></hr>

  <div className="columnB">
<label htmlFor="trelloId">Trello UserName:</label>
<br></br>

  <input type="text" name="trelloId" onChange={this.textValHandler} ></input>
   <br></br><br></br>

  <label htmlFor="sabioId">Sabio ID:</label>
  <br></br>
  <input type="text" name="sabioId" onChange={this.textValHandler}></input>
  </div>
  <hr  style={{width: 2, height: 110, backgroundColor: 'powderblue'}}></hr>
  <div className="columnC">
<label htmlFor="apiId">Api Endpoints:</label>
<br></br>

  <input type="text" name="apiId" onChange={this.textValHandler} ></input>
   <br></br><br></br>

  <label htmlFor="linkId">LinkedinId ID:</label>
  <br></br>
  <input type="text" name="linkId" onChange={this.textValHandler}></input>
  </div>

  </div>
  <br></br>  

  <div className="d-grid gap-2 col-6 mx-auto">
  <button className="btn btn-danger btn-sm" style={{width:"50%"}} 
   onClick={this.editState} >Edit</button>
   
   <button className="btn btn-primary btn-sm" style={{width:"50%"}} 
   onClick={this.passState} >Submit</button>
</div>
  
{/* <div style={{ display: "flex", width:"50%", float: 'right', paddingRight:"10%"}} >
  <button className="btn btn-danger btn-sm" style={{width:"50%"}} 
   onClick={this.editState} >Edit</button>
{   }
   <button className="btn btn-primary btn-sm" style={{width:"50%"}} 
   onClick={this.passState} >Submit</button>

</div> */}
  
  
  <br></br><br></br>
  
</form>
<br></br><br></br><br></br><br></br><br></br><br></br>
</div>

          



        );
    }
}

export default ProductForm;