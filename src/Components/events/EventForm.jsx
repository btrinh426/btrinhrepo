import React from "react";
import LocationSearchInput from "./LocationSearchInput";
const onChange = (e) => {};

function EventForm(props) {
  const passResults = (results) => {
    props.passResults(results);
    console.log("pass 2", results);
  };
  const onFormFieldChanged = (e) => {
    props.onFormFieldChanged(e);
  };
  const submitInfo = (e) => {
    props.submitInfo(e);
  };

  return (
    <form>
      <div className="row">
        <div className="col mb-2">
          {/*
          Autocomplete box for adding an address
          <label htmlFor="addressSearch">Event Address</label>
          <LocationSearchInput
            value=""
            debounce={5000}
            onChange={onChange}
            children={true}
            passResults={passResults}
          /> */}
        </div>
      </div>

      <div className="row">
        <div className="col">
          {/*Displays address currently in formData object. Gonna find a better way to do this */}
          <label htmlFor="currentAddress">Current Address (Read-Only)</label>
          <input
            type="text"
            className="form-control mb-2"
            name="staticAddress"
            value={props.formData.metaData.location.address}
            placeholder="No Address on File"
            readOnly={true}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mb-2"
            name="name"
            value={props.formData.name}
            onChange={onFormFieldChanged}
          />
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            className="form-control mb-2"
            name="headline"
            value={props.formData.headline}
            onChange={onFormFieldChanged}
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control mb-2"
            name="description"
            rows="3"
            value={props.formData.description}
            onChange={onFormFieldChanged}
          ></textarea>
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            className="form-control mb-2"
            name="summary"
            value={props.formData.summary}
            onChange={onFormFieldChanged}
          />
          <label htmlFor="description">Slug</label>
          <input
            type="text"
            className="form-control mb-2"
            name="slug"
            value={props.formData.slug}
            onChange={onFormFieldChanged}
          />
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={submitInfo}>
        Submit
      </button>
    </form>
  );
}

export default EventForm;
