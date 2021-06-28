import React from "react";
// import AFriend from "./Friend";

class FriendFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // startId: 0,
      stopId: 100,
      currentId: 0,
      isScanning: false,
      isCriticalFault: false, // probably excess
      friendList: [],
      mappedFriendsList: [],
    };
  }

  // Scan properties setup
  onScanFieldChanged = () => {
    // update scanning fields
  };

  onScanClicked = () => {
    this.scanNext(this.state.currentId);
  };

  scanNext = (nextId) => {
    // change states - currentId
    // display current id progress
    // Initiate getById
  };

  onGetByIdSuccess = (data) => {
    // change states by pushing found item
    // add object to list and map
  };
  onGetByIdFail = (err) => {
    // assess error: abort, or continue?
    // if abort, change states isScanning and isCriticalFault
  };
  onGetByIdAlways = () => {
    this.checkRemaining(this.state.currentId + 1);
  };

  checkRemaining = (nextId) => {
    if (nextId >= this.state.stopId) {
      return;
    } else {
      // delay?
      this.scanNext(this.state.currentId + 1);
    }
  };

  render() {
    return <div></div>;
  }
}

export default FriendFinder;
