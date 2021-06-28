import React from "react";
import "./CompoentStyle/JobForm.scss";

const Stylin = () => {
    return (
        <>
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
                        <p>ROW 1</p>
                        <div className="col 1 test">C1</div>
                        <div className="col 2 test">C2</div>
                    </div>
                    <div className="row 2 row-test">
                        <p>ROW 2</p>
                        <div className="col 3 test">C3</div>
                    </div>
                    <div className="row 3 row-test">
                        <p>ROW 3</p>
                        <div className="col 4 test">C4</div>
                        <div className="col 5 test">C5</div>
                    </div>
                </div>
            </>
        </>
    );
};

export default Stylin;
