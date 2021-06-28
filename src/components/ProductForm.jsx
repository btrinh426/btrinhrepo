import React from"react"
import { toast } from "react-toastify";
import * as userServices from "../services/AxiosService"
class ProductForm extends React.Component{
state={
    currentProduct:{ 
    name:"",
    manufacturer:"",
    Description:"",
    Cost:0
}
}

textValHandler =(e)=>
{
    
let currentTarget=e.currentTarget;
let newVal = currentTarget.value;
let inputName= currentTarget.name;
this.setState(()=>
{
let currentProduct={...this.state.currentProduct};

currentProduct[inputName]=newVal;

return {currentProduct}

})

// console.log(this.state)
}

captureData=(e)=>
{
    e.preventDefault(); 
    userServices.submitProducts(this.state)
    .then(this.productsubmitSuccess)
    .catch(this.productsubmiterror)

}

productsubmitSuccess=(result)=>
{
    toast.success('Successfully Submitted! Keep Product ID:'+result.data.item)
    console.log(result.data.item)
}


    render()
    {
return(

<div>
      <br></br>
        <form style={{ backgroundColor: 'white', width:"40%", border:"1px solid grey", marginLeft:"20%"}}>
        <div className="alert alert" role="alert" style={{ backgroundColor:"#808080"}}>
        <h2 style={{color:"white", textAlign:"center", backgroundColor:"#808080"}}>Enter Product Form</h2>
</div> 
<div className=" text-muted"  style={{fontSize:".7em",textAlign:"center"}}>Enter Details Here</div>
        <div style={{marginLeft:"5%"}}>
     
        
        <div>
        <br></br>
          <label style={{fontSize:".8em", marginLeft:"20%"}}>Name:</label>
        <br></br>        
          <input type="text" 
          name="name"  
          value={this.state.currentProduct.name}        
          onChange={this.textValHandler}
        
        
           style={{fontSize:".9em", marginLeft:"20%"}}
           
           ></input>

<br></br><br></br>
          <label style={{fontSize:".8em", marginLeft:"20%"}}>Manufacturer:</label>
        <br></br>        
          <input type="text" 
          name="manufacturer"  
          value={this.state.currentProduct.manufacturer}        
          onChange={this.textValHandler}
        
        
           style={{fontSize:".9em", marginLeft:"20%"}}
           
           ></input>


          </div>

          <div>
        <br></br>
          <label style={{fontSize:".8em", marginLeft:"20%"}}>Description:</label>
        <br></br>        
          <input          
          type="text" 
          name="Description"          
          onChange={this.textValHandler}
        value={this.state.currentProduct.Description }        
           style={{fontSize:".9em", marginLeft:"20%"}}
           
           ></input>

          <br></br> <br></br>
          <label style={{fontSize:".8em", marginLeft:"20%"}}>Cost:</label>
          <br></br>
          <input type="text" 
          name="Cost"
          value={this.state.currentProduct.Cost  }
           onChange={this.textValHandler}
            style={{fontSize:".9em", marginLeft:"20%"}}></input>
         
          <br></br> <br></br>

          </div>


                
                   </div>
         
          <br></br>  
          <div style={{ margin: 'auto', width:"80%"}}>
          <button className="btn btn-primary btn-md btn-block" onClick={this.captureData}  >Submit Form</button>          
          </div>

          <br></br><br></br>
          <div style={{textAlign:"center", fontSize:".8em"}} className=" text-muted">@ Sabio</div>

        </form>
</div>


)

    }
}

export default ProductForm;