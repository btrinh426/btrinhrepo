import { Autocomplete } from "@react-google-maps/api";
import React from "react";

class LocationSearchAuto extends React.Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
      let addressData = this.autocomplete.getPlace();
      let result = {
        latitude: addressData.geometry.location.lat(),
        longitude: addressData.geometry.location.lng(),
      };
      this.props.handleLocation(result);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    return (
      <Autocomplete onLoad={this.onLoad} onPlaceChanged={this.onPlaceChanged}>
        <input
          type="text"
          placeholder="City"
          autoComplete="off"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            borderRadius: `3px`,
            boxShadow: `0 1px 2px rgba(0, 0, 0, 0.3)`,
            padding: `0.375rem 0.75rem`,
            fontSize: `1rem`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </Autocomplete>
    );
  }
}

export default LocationSearchAuto;
