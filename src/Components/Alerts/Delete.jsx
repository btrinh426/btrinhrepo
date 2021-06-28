import React, {Component} from 'react';
import swal from 'sweetalert';

export default class Delete extends Component {

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
              swal("File Has Been Deleted Successfully", {
                icon: "success",
              });
            } else {
              swal("File Has Not Been Deleted");
            }
          });
  }

  render() {
    return (
      <div>
         <button className="btn btn-secondary" onClick={this.deleteThis}>New Button</button>
        {this.state.alert}
      </div>
    );
  }
}