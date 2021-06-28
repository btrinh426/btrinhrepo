import React from "react";

class AddFriends extends React.Component {
  constructor(props) {
    super(props); //constructor fx for the constructor base class
    this.state = { aProp: "a property value hard coded by constructor props" };
    // can manipulate data early on...   only fires one time
    //we can have it generate state for itself
  }

  render() {
    return <strong>{this.props.friend}</strong>;
    //references the property within Friends called friend (within AddFriends tag)
  }
}

export default AddFriends;

// receive data from parent using props    the parent needs to send data (via the component tag within it)
// AddFriend says if you want to implement me, you need to pass me something (via props)
