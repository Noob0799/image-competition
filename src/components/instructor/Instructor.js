import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router';
import CreateTask from './createtask/CreateTask';
import CheckTask from './checktask/CheckTask';

class Instructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
    }

    componentDidMount() {
        this.setState({
            details: this.props.location.state
        });
    }

    handleRoute = (option) => {
        if(option === 'home') {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <Fragment>
                <div>
                    <input type="button" value="Back" onClick={() => this.handleRoute('home')}/>
                </div>
                <CreateTask details={this.state.details}/>
                <CheckTask details={this.state.details}/>
            </Fragment>
        )
    }
}

export default withRouter(Instructor);