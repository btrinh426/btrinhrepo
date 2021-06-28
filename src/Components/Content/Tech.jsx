import React from "react";
import { Link } from "react-router-dom";

class Tech extends React.Component{
    render(){
        return(
            <div className="container">
                <div style={{ marginLeft: '8rem', padding: '8rem' }}> 
                    <h1>Tech Companies</h1>
                    <ul>
                        <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>
                        <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
                        <li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
                        <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li>
                    </ul>
                    <div style={{ marginTop: '3rem' }}> 
                    <Link to="/Home">
                        <button className="btn btn-secondary">
                            Go Back &raquo;
                        </button>
                    </Link>
                </div>
                </div>
                
            </div>
        )
    }
}
export default Tech;