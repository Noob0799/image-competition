import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router';
import taskStore from '../../reducer/taskReducer';
import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        };
    }

    handleRoute = (option) => {
        const name = document.getElementById("username").value;
        if(option === 'scores') {
            this.props.history.push('/scores');
        } else if(name) {
            const token = name+"-"+option;
            taskStore.dispatch({type: 'ADD_USER', authObj: {name: name,option: option,token: token}});
            if(option === 'instructor') {
                this.setState({
                    hidden: !this.state.hidden
                });
            } else if(option === 'student') {
                this.props.history.push('/student');
            } else if(option === 'set') {
                this.props.history.push('/instructor/set');
            } else if(option === 'check') {
                this.props.history.push('/instructor/check');
            }
        }
    }
    render() {
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
                        <button className="btn btn-warning m-1" onClick={() => this.handleRoute('instructor')}>Instructor</button>
                        <button className="btn btn-warning m-1" onClick={() => this.handleRoute('student')}>Student</button>
                    </div>
                    <div className="instructor-teacher-route" hidden={this.state.hidden}>
                        <button className="btn btn-outline-warning m-1" onClick={() => this.handleRoute('set')}>Set Task</button>
                        <button className="btn btn-outline-warning m-1" onClick={() => this.handleRoute('check')}>Check Task</button>
                    </div>
                    <p>Check task scores below</p>
                    <div className="student-scores">
                        <button className="btn btn-success" onClick={() => this.handleRoute('scores')}>Scores</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Landing);
