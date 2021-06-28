import React from "react";
import PropTypes from "prop-types";

const Student = props => {
    console.log(props.student);
    return (
        <div className="col-sm-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Name: {props.student.first_name} {props.student.last_name}
                    </h5>
                    <p className="card-text">Email: {props.student.email}</p>
                    <p className="card-text">Grade: {props.student.grade % 100}</p>
                </div>
            </div>
        </div>
    );
};

Student.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        grade: PropTypes.number.isRequired
    })
};

export default Student;