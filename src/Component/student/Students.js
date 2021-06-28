import {PropTypes, checkPropTypes} from "prop-types";
import React from "react";
import Student from "./Student";
import debug from "sabio-debug";

const _logger = debug.extend("Students"); //sabio:Students

// const _loggerPage = debug.extend("Student"); //Sabio:App:Student

class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [
                {
                    id: 1,
                    firstName: "John",
                    lastName: "Adne",
                    email: "badne0@bing.com",
                    grade: 80
                },
                {
                    id: 2,
                    firstName: "Dallas",
                    lastName: "McConachie",
                    email: "dmcconachie1@bing.com",
                    grade: 90
                },
                {
                    id: 3,
                    firstName: "Nonna",
                    lastName: "Meijer",
                    email: "nmeijer2@statcounter.com",
                    grade: 34
                },
                {
                    id: 4,
                    firstName: "Tammi",
                    lastName: "Agius",
                    email: "tagius3@cafepress.com",
                    grade: 86
                }
            ],

            mappedStudent: []
        };
    }

    componentDidMount() {
        this.setState(() => {
            return {
                mappedStudent: this.state.student.map(this.mappedStudent)
            }
        });
    }

    mappedStudent = student => <Student key={student.id} student={student} />;

    render() {
        _logger("logger renders mapped student")
        return (
            <>
            <h2>No PropTypes</h2>
            <div className="row">{this.state.mappedStudent}</div>
            </>
        );
    }
}

export default Students;