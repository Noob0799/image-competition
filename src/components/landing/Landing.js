import React, { Fragment } from 'react'
import {withRouter} from 'react-router';
import taskStore from '../../reducer/taskReducer';
import './Landing.css';

const Landing = (props) => {
    const handleRoute = (option) => {
        const name = document.getElementById("username").value;
        if(option === 'scores') {
            props.history.push('/scores');
        } else if(name) {
            const token = name+"-"+option;
            taskStore.dispatch({type: 'ADD_USER', authObj: {name: name,option: option,token: token}});
            if(option === 'instructor') {
                props.history.push('/instructor');
            } else if(option === 'student') {
                props.history.push('/student');
            }
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
                <input type="text" id="username" placeholder="eg: Sayantan Roy"/>
                <p>Are you an Instructor or a Student?</p>
                <div className="instructor-student-btn">
                    <button className="btn btn-warning m-1" onClick={() => handleRoute('instructor')}>Instructor</button>
                    <button className="btn btn-warning m-1" onClick={() => handleRoute('student')}>Student</button>
                </div>
                <p>Check task scores below</p>
                <div className="student-scores">
                    <button className="btn btn-success" onClick={() => handleRoute('scores')}>Scores</button>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(Landing);
