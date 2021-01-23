import React, { Component, Fragment } from 'react'
import taskStore from '../../../reducer/taskReducer';

export default class CheckTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            level: 'Beginner'
        };
    }

    componentDidMount() {
        this.unsubscribe = taskStore.subscribe(() => this.handleStateChange(taskStore)); //subscription to store
        this.setState({
            tasks: [...taskStore.getState().taskList]
        });
    }

    //callback to handle change in redux store
    handleStateChange = (store) => {
        this.setState({
            tasks: [...store.getState().taskList]
        });
    }

    handleLevelChange = (e) => {
        this.setState({
            level: e.target.value
        });
    }


    render() {
        const displayTasks = [];
        if(this.state.tasks.length>0) {
            let taskList = [];
            if(this.state.level === 'Beginner') {
                taskList = [...this.state.tasks[0].tasks];
            } else if(this.state.level === 'Intermediate') {
                taskList = [...this.state.tasks[1].tasks];
            } else {
                taskList = [...this.state.tasks[2].tasks];
            }
            taskList.forEach(element => {
                if(element.isCompleted && !element.isChecked) {
                    displayTasks.push(element);
                }
            });
        }
        let elem = <p>There are no unchecked tasks...</p>;
        if(displayTasks.length > 0) {
            elem = (
                displayTasks.map(task => {
                    return (
                        <div key={task.id}>
                            <div><label>Task Id:</label><br/>{task.id}</div>
                            <div><label>Task Name:</label><br/>{task.taskname}</div>
                            <div><label>Task Details:</label><br/>{task.instructions}</div>
                            <div>Image download</div>
                            <div>
                                <div>
                                    <label>Name:</label><br/>
                                    {/* <div><input type="text" id={"studentname"+task.id}/></div> */}
                                    <label>Upload Edited Image:</label>
                                    <div>Image upload</div>
                                </div>
                            </div>
                            <div>
                                <input type="button" value="Submit Task" onClick={this.handleSubmit}/>
                            </div>
                        </div>
                    );
                })
            );
        }
        return (
            <Fragment>
                <div className="checktask-level">
                    <label>Task Level:</label><br/>
                    <select id="checklevel" onChange={(e) => this.handleLevelChange(e)}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div className="checktask-display">
                    {elem}
                </div>
            </Fragment>
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}
