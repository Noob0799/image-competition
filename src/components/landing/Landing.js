import React, { Fragment } from 'react'
import {withRouter} from 'react-router';

const Landing = (props) => {
    const handleRoute = (option) => {
        const name = document.getElementById("username").value;
        if(option === 'instructor') {
            props.history.push({pathname: '/instructor', state: {name,option}});
        } else if(option === 'student') {
            props.history.push({pathname: '/student', state: {name,option}});
        }
    }
    return (
        <Fragment>
            <div className="landing-container">
                <h2>Welcome to our Image Bootcamp</h2>
                <p>Test yourself and enhance your skills as an image editor</p>
            </div>
            <div className="landing-btn">
                <label>Enter your name:</label><br/>
                <input type="text" id="username"/>
                <p>Are you an Instructor or a Student?</p>
                <div className="instructor-btn">
                    <input type="button" value="Instructor" onClick={() => handleRoute('instructor')}/>
                </div>
                <div className="student-btn">
                    <input type="button" value="Student" onClick={() => handleRoute('student')}/>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(Landing);
