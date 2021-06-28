import React, { Component } from "react";

class AllFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoaded: false,
    };
  }

  componentDidMount() {
    
    fetch("https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10")
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded: true,
            items: json,
          });
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>...Loading</div>;
    } 
    
    else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                 Title: {item.title} | Slug: {item.slug} 
              </li>
            ))};
          </ul>
        </div>
      );
    }
  }
}

export default AllFriends;
