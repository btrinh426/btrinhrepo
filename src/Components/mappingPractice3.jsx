import React from "react";

const Person = (props) => {
  return (
    <React.Fragment>
      <div className="col-md-4">
        <p></p> <p></p>
        <div class="card-deck">
          <div class="card">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">
                {props.avenger.first_name} {props.avenger.last_name}
              </h5>
              <p class="card-text">
                <p>ID # {props.avenger.id}</p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div class="card-footer">
              <button
                className="btn btn-primary btn-sm"
                //   onClick={(e) => props.selectFriend(props.friend, e)}
              >
                Edit
              </button>
              {"   "}
              <button
                className="btn btn-danger btn-sm"
                //   onClick={(e) => props.delFriend(props.friend.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Person;

//functional component example
