import React from "react";
import swal from 'sweetalert';

class Footer extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          alert: null
        };
      } 
    
      deleteThis() {
            swal({
                title: "Confirm Delete",
                text: "Once deleted, you will not be able to recover this file",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("File Has Been Successfully Deleted", {
                    icon: "success",
                  });
                } else {
                  swal("File Has Not Been Deleted");
                }
              });
      }
    render(){
        return(
            
            <footer className="container">
            <div style={{ padding: '10rem', position: "relative"}}>
            <div>
            <div className="container"> 
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-danger" onClick={this.deleteThis}>Delete Something</button>
            {this.state.alert}
            </div>
            </div>
            </div>
            <p>&copy; Sabio 2019-2020</p>
            </div>
            
            
            </footer>
        )
    }
}
export default Footer;