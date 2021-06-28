import React, { useState } from "react";
import CarYear from "./CarYear"

class Cars extends React.Component {

    state = [
        {
            avatar: "https://images.hgmsites.net/hug/2020-kia-sorento_100722275_h.jpg",
            make: "Kia",
            model: "Sorento",
            year: 2020,
            id: 0
        },
        {
            avatar: "https://www.thetruthaboutcars.com/wp-content/uploads/2018/03/13742_Optima-e1522429234156.jpg",
            make: "Kia",
            model: "Optima",
            year: 2019,
            id: 1
        },
        {
            avatar: "https://gaadiwaadi.com/wp-content/uploads/2020/10/2021-Tesla-Model-3-feature.jpg",
            make: "Tesla",
            model: "Model 3",
            year: 2021,
            id: 2
        },
        {
            avatar: "https://www.chicagoautoshow.com/assets/1/23/VehicleRegularDimensionId/2019-Honda-Civic-1.jpg",
            make: "Honda",
            model: "Civic",
            year: 2019,
            id: 3
        },
        {
            avatar: "http://images.newcars.com/images/car-pictures/original/2018-Honda-Accord-Sedan-LX-4dr-Sedan-Exterior-2.png",
            make: "Honda",
            model: "Accord",
            year: 2018,
            id: 4
        },
        {
            avatar: "https://carros2021.pro.br/wp-content/uploads/2020/04/VW-Jetta-2021-8.jpg",
            make: "Volkswagen",
            model: "Jetta",
            year: 2021,
            id: 5
        },
        {
            avatar: "https://cdn.motor1.com/images/mgl/PpxnX/s1/2021-toyota-camry-xse-hybrid.jpg",
            make: "Toyota",
            model: "Camry",
            year: 2021,
            id: 6
        },
        {
            avatar: "https://pictures.topspeed.com/IMG/jpg/201806/2019-ford-mustang---.jpg",
            make: "Ford",
            model: "Mustang",
            year: 2019,
            id: 7
        },
        {
            avatar: "https://st.automobilemag.com/uploads/sites/11/2018/05/2019-Ford-F-150-Raptor-front-three-quarter-02.jpg",
            make: "Ford",
            model: "F-150",
            year: 2019,
            id: 8
        },
        {
            avatar: "https://assets.newcars.com/images/car-pictures/original/2020-Toyota-Camry-Sedan-L-4dr-Sedan-Photo-1.png",
            make: "Toyota",
            model: "Camry",
            year: 2020,
            id: 9
        },
        {
            avatar: "https://www.fordfd.com/wp-content/uploads/2020/03/2021-Ford-F150-Exterior.jpg",
            make: "Ford",
            model: "F-150",
            year: 2021,
            id: 10
        }
    ]
    

    mapCars = (oneCar)=> {
        return (
            
            <div key={`Cars-${oneCar.id}`} className="card col-md-3">
                <img src={oneCar.avatar} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{oneCar.model}</h5>
                    <h5 className="card-text">{oneCar.make}</h5>
                    <h5 className="card-text">{oneCar.year}</h5>
                </div>
            </div>

        )
    };

    render() {

        return (
            <div className="col-md-12 p-5">
            <h1>Cars</h1>
            <hr />
            <div className="row">
                {this.state.map(this.mapCars)} 
            </div>
            <CarYear cars={this.state}/>
            </div>
        )
    }
}

export default Cars