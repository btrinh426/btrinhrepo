import React from"react"
import CarsTemplate from"./CarsTemplate"

class Cars extends React.Component
{
state={
    currentCar:[
        {
            make: "Kia",
            model: "Sorento",
            year: 2020,
            id: 1
        },
        {
            make: "Kia",
            model: "Optima",
            year: 2019
            ,
            id: 2
        },
        {
            make: "Tesla",
            model: "Model 3",
            year: 2021 ,
            id: 3
        },
        {
            make: "Honda",
            model: "Civic",
            year: 2019 ,
            id: 4
        },
        {
            make: "Honda",
            model: "Accord",
            year: 2018 ,
            id: 5
        },
        {
            make: "Volkswagen",
            model: "Jetta",
            year: 2021 ,
            id: 6
        },
        {
            make: "Toyota",
            model: "Camry",
            year: 2021 ,
            id: 7
        },
        {
            make: "Ford",
            model: "Mustang",
            year: 2019 ,
            id: 8
        },
        {
            make: "Ford",
            model: "F-150",
            year: 2019 ,
            id: 9
        },
        {
            make: "Toyota",
            model: "Camry",
            year: 2020
            ,
            id: 10
        },
        {
            make: "Ford",
            model: "F-150",
            year: 2021 ,
            id: 11
        }
    ]
}
componentDidMount(){
   this.setState((prevState)=>
   {

    return{mappedCars:prevState.currentCar.map(this.onShowCar)}
   }
   )   
}


onShowCar=()=>
{
    this.setState((prevState)=>
    {
 
     return{mappedCars:prevState.currentCar.map(this.mapCars)}
    }
    )   
}


mapCars=(oneCar)=>{
    // console.log(oneCar)  
return (

    <React.Fragment key={`CarsList-${oneCar.id}`}>
          <CarsTemplate currentCar={oneCar} ></CarsTemplate>      
      </React.Fragment>
)
}

filterCars =(years)=>
{
    let currentTarget = years.currentTarget;
    let currentVal = currentTarget.value;
    console.log(currentVal)  

    // return{filteredCars:prevState.currentCar.filter(this.onFilteredCars)}

    this.setState((prevState)=>
    { 
     return {filteredCars:prevState.currentCar.filter(this.onFilteredCars)}
    })
       
    }


    render()
    {
        return(
            <div>
<div 
style={{textAlign:"center",
backgroundColor:"#668cff",color:"white", borderRadius:"50%",width:"25%",margin:"auto",
marginLeft:"40%", height:"60px"}}>
 <h2 > Cars Profile</h2>
</div>
<button className="btn btn-primary" onClick={this.onShowCar}>Show Cars</button>
<select class="form-control" id="year" style={{float:"",width:"10%" }}
onChange={this.filterCars} placeholder="Select a year"
value={this.state.currentCar.year}
  >   
        <option>Show All</option>
        <option >2018</option>
        <option >2019</option>
        <option >2020</option>
        <option >2021</option>
        </select>
<hr style={{width:"75%", marginLeft:"20%"}}></hr>
            <div className="row">
           
           {this.state.mappedCars}         
     
            </div>
            </div>

        )
    }
}
export default Cars;