import React from "react";

const EventModal = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  const onFileUpload = (e) => {
    console.log(e.target.files[0]);
    props.onFileUpload(e.target.files[0]);
  };

  return (
    <React.Fragment>
      <div
        className={`modal fade ${props.modalShow}`}
        style={{ display: props.display }}
        id="jobModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
          style={{ width: "90%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEventTitle">
                Event
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={props.onModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={props.onFormFieldChange}
                      value={props.event.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputHeadline"
                    className="col-sm-2 col-form-label"
                  >
                    Headline
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="headline"
                      name="headline"
                      onChange={props.onFormFieldChange}
                      value={props.event.headline}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputDescription"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={props.onFormFieldChange}
                      value={props.event.description}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputSummary"
                    className="col-sm-2 col-form-label"
                  >
                    Summary
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="summary"
                      name="summary"
                      onChange={props.onFormFieldChange}
                      value={props.event.summary}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="formControlFile1"
                    className="col-sm-2 form-label"
                  >
                    Slug
                  </label>
                  <div className="col-sm-10">
                    {props.event.slug && (
                      <img src={props.event.slug} width="50px" alt="..." />
                    )}
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      name="fileUpload"
                      onChange={onFileUpload}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-5">
                    <label
                      htmlFor="date-start-input"
                      className="col-form-label"
                    >
                      Date Start
                    </label>
                    <div>
                      <input
                        className="form-control"
                        type="date"
                        name="dateStart"
                        onChange={props.onFormFieldChange}
                        value={props.event.dateStart}
                        id="date-end-input"
                      />
                    </div>
                  </div>
                  <div className="col-5">
                    <label htmlFor="date-end-input" className="col-form-label">
                      Date End
                    </label>
                    <div>
                      <input
                        className="form-control"
                        type="date"
                        name="dateEnd"
                        onChange={props.onFormFieldChange}
                        value={props.event.dateEnd}
                        id="date-end-input"
                      />
                    </div>
                  </div>
                  <div
                    className="form-check"
                    style={{ paddingLeft: "2.25rem", paddingTop: "45px" }}
                  >
                    <div className="col-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="statusId"
                        checked={props.event.statusId === "Active"}
                        onChange={props.onFormFieldChange}
                        id="activeCheck"
                      />
                      <label className="form-check-label" htmlFor="activeCheck">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row" style={{ paddingTop: "10px" }}>
                  <div className="col-7">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="address"
                      onChange={props.onFormFieldChange}
                      value={props.event.address}
                    />
                  </div>
                  <div className="col-5">
                    <label htmlFor="inputZip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      name="zipCode"
                      onChange={props.onFormFieldChange}
                      value={props.event.zipCode}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={props.onModalClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="submit-button"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventModal;
