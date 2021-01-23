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
                <input type="text" id="username"/>
                <p>Are you an Instructor or a Student?</p>
                <div className="instructor-btn">
                    <input type="button" value="Instructor" onClick={() => handleRoute('instructor')}/>
                </div>
                <div className="student-btn">
                    <input type="button" value="Student" onClick={() => handleRoute('student')}/>
                </div>
                <p>Check task scores below</p>
                <div className="student-scores">
                    <input type="button" value="Scores" onClick={() => handleRoute('scores')}/>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(Landing);
