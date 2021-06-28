import React from "react";

function EventItem({ oneEvent, handleEdit, viewMore }) {
  // function onDelClicked(e) {
  //   handleDelete(oneEvent);
  // }

  function onEditClicked(e) {
    handleEdit(oneEvent);
  }

  function onViewMoreClicked(e) {
    // // console.log("load modal please");
    // return <JobModal />;
    viewMore(oneEvent);
  }
  return (
    <div className="row">
      <div className="col-12">
        <h4>Event Item</h4>
        <div className="row">Title</div>
        <div className="row">Content</div>
        <div className="row">Description</div>
        <div className="row"> Dates</div>
        <div className="row">
          <button
            type="button"
            className="btn btn-dark btnFrndCardEdit"
            onClick={onViewMoreClicked}
          >
            View More...
          </button>
          <button
            type="button"
            className="btn btn-dark btnFrndCardEdit mx-1"
            onClick={onEditClicked}
          >
            Edit...
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EventItem);
