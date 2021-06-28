import React from "react";
import "./CompoentStyle/JobCard.scss";

const JobCard = () => {
    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card__image-container">
                        <img
                            className="card__image"
                            src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80"
                            alt="Test"
                        />
                    </div>
                    <svg className="card__svg" viewBox="0 0 800 500">
                        <path
                            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                            stroke="transparent"
                            fill="#333"
                        />
                        <path
                            className="card__line"
                            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                            stroke="pink"
                            strokeWidth={3}
                            fill="transparent"
                        />
                    </svg>
                    <div className="card__content">
                        <h1 className="card__title">A Job</h1>
                        <h4>Salary: $300,000</h4>
                        <ul className="list-group list-group-flush cList">
                            <li className="list-group-item text-muted">
                                Desciption: |
                            </li>
                            <li className="list-group-item text-muted">
                                Location: |
                            </li>
                        </ul>
                        <div className="card-body cButtons">
                            <button className="editB">
                                <span>Edit</span>
                            </button>
                            <button className="editB">
                                <span>Delete</span>
                            </button>
                            <button className="editB">
                                <span>+ Info</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobCard;
