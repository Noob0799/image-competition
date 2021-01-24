import React, { Fragment } from 'react';
import './Navbar.css';
import {withRouter} from 'react-router';

const Navbar = (props) => {
    const handleRoute = () => {
        props.history.push('/');
    }
    let heading = null;
    if(props.option === 'set') {
        heading = "Set Task";
    } else if(props.option === 'check') {
        heading = "Check Task";
    } else if(props.option === 'submit') {
        heading = "Submit Task";
    } else if(props.option === 'score') {
        heading = "Task Scores";
    }
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div className="nav-heading">{heading}</div>
                <button className="btn btn-warning nav-btn m-1" onClick={() => handleRoute('instructor')}>
                    Back
                </button>
            </nav>
        </Fragment>
    )
}

export default withRouter(Navbar);
