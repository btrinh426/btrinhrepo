import React from "react";
import "./CompoentStyle/JobForm.scss";
import logo from "../../logo.svg";

const JobForm = props => {
    return (
        <>
            <div className="container form-box">
                <div id="header" className="row ">
                    <img
                        className="react-img"
                        src={logo}
                        height="300"
                        width="300"
                        alt=""
                    />
                    <h1 id="formHeader">Let's Post a New Job</h1>
                </div>

                <div className="row 1 row-test">
                    <div className="col form-col">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Company Name"
                            />
                            <label htmlFor="Copmany Name">Copmany Name</label>
                        </div>
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="Salary"
                                placeholder="Salary"
                            />
                            <label htmlFor="Salary">Salary </label>
                        </div>
                    </div>
                    <div className="col form-col">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Position"
                            />
                            <label htmlFor="title">Position</label>
                        </div>
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Location"
                            />
                            <label htmlFor="Location">Location </label>
                        </div>
                    </div>
                </div>
                <div className="row 2 row-test">
                    <div className="col 3 test">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Job Description"
                            />
                            <label htmlFor="description">Description </label>
                        </div>
                    </div>
                </div>
                <div className="row 2 row-test">
                    <div className="col 3 test">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="summary"
                                placeholder="Job Summary"
                            />
                            <label htmlFor="summary">summary </label>
                        </div>
                    </div>
                </div>
                <div className="row 1 row-test">
                    <div className="col form-col">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Company Name"
                            />
                            <label htmlFor="Copmany Name">Copmany Name</label>
                        </div>
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="Salary"
                                placeholder="Salary"
                            />
                            <label htmlFor="Salary">Salary </label>
                        </div>
                    </div>
                    <div className="col form-col">
                        <div className="form-floating mb-1 form-input">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Location"
                            />
                            <label htmlFor="Location">Location </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobForm;

// <div className="row position-absolute top-0 start-0">
//                         <header className="container-header">
//                             <h1 id="formHeader">Let's Post a New Job</h1>
//                         </header>
//                     </div>
//                     <div className="row g-4 top">
//                         <div className="col form-col">
//                             <div className="form-floating mb-2 form-input">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Company Name"
//                                 />
//                                 <label htmlFor="floatingInput">
//                                     Copmany Name
//                                 </label>
//                             </div>
//                             <div className="form-floating mb-2 form-input">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Position"
//                                 />
//                                 <label htmlFor="JobTitle">Salary </label>
//                             </div>
//                         </div>
//                         <div className="col form-col">
//                             <div className="form-floating mb-2 form-input">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Company Name"
//                                 />
//                                 <label htmlFor="floatingInput">Position</label>
//                             </div>
//                             <div className="form-floating mb-2 form-input">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Position"
//                                 />
//                                 <label htmlFor="JobTitle">Location</label>
//                             </div>
//                         </div>
//                     </div>
