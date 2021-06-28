import { Autocomplete } from "@react-google-maps/api";
import React from "react";

class AddressAutoComplete extends React.Component {
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
      let obj = {
        address: addressData.formatted_address,
        latitude: addressData.geometry.location.lat(),
        longitude: addressData.geometry.location.lng(),
        zipcode: addressData.address_components[6].long_name,
      };
      this.props.handleAddress(obj);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    return (
      <Autocomplete onLoad={this.onLoad} onPlaceChanged={this.onPlaceChanged}>
        <input
          type="text"
          placeholder="Address"
          autoComplete="off"
          name="address"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `75%`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </Autocomplete>
    );
  }
}

export default AddressAutoComplete;
