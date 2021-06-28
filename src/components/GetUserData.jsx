import React,{ Component } from 'react';


class GetUserData extends Component {
    constructor(props) {
       super(props);
       this.state = {
          data: []
       }
    }

    render() {
        const { data } = this.state;
        return (
           <div className="data">
             {Array.isArray(data) && data.map(object => (
                  <p key={object.name}>{object.email}</p>
              ))}
           </div>
         )
     }

}

export default GetUserData;