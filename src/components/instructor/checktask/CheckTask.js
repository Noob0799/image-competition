import React, { Component, Fragment } from 'react'
import taskStore from '../../../reducer/taskReducer';
import './CheckTask.css';
import Navbar from '../../utils/Navbar';

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

    handleScore = (id,name) => {
        const score = document.getElementById(name+id+"score").value;
        let tasks = [];
        if(this.state.level === 'Beginner') {
            tasks = [...this.state.tasks[0].tasks];
        } else if(this.state.level === 'Intermediate') {
            tasks = [...this.state.tasks[1].tasks];
        } else {
            tasks = [...this.state.tasks[2].tasks];
        }
        tasks.forEach(task => {
            if(task.id === id) {
                task.submissions.forEach(sub => {
                    if(sub.studentName === name) {
                        sub.score = score;
                        sub.isChecked = true;
                    }
                })
            }
        });
        const taskList = this.state.tasks;
        if(this.state.level === 'Beginner') {
            taskList[0].tasks = [...tasks];
        } else if(this.state.level === 'Intermediate') {
            taskList[1].tasks = [...tasks];
        } else {
            taskList[2].tasks = [...tasks];
        }
        this.setState({
            tasks: [...taskList]
        });
        taskStore.dispatch({type: 'UPDATE_TASK', taskList: taskList});
    }

    handleRoute = (option) => {
        if(option === 'home') {
            this.props.history.push('/');
        }
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
                if(element.submissions.length>0) {
                    let found = false;
                    for(let i=0; i<element.submissions.length; i++) {
                        if(!element.submissions[i].isChecked) {
                            found = true;
                            break;
                        }
                    }
                    if(found) {
                        displayTasks.push(element);
                    }
                }
            });
        }
        let elem = <p>There are no unchecked tasks...</p>;
        if(displayTasks.length > 0) {
            elem = (
                displayTasks.map(task => {
                    return (
                        <div key={task.id} className="checktask-container">
                            <div className="checktask-header row">
                                <div className="col-4">Task Id:<br/>{task.id}</div>
                                <div className="col-4">Task Name:<br/>{task.taskname}</div>
                                <div className="col-4 checktask-img"><img src={task.imageuri} alt="Preview"/></div>
                            </div>
                            <div className="checktask-sub-container">
                            {
                                task.submissions.map(sub => {
                                    return (
                                        <div key={sub.studentName+task.id} className="checktask-sub-item row">
                                            <div className="col-3">
                                                <label>Name:</label><br/>{sub.studentName}
                                            </div>
                                            <div className="col-3">
                                                <label>Submission:</label><br/>
                                                <a href={sub.imageuri} download={"Sub_"+sub.studentName+"_"+task.id+".jpg"}>
                                                    <img src={task.imageuri} alt="Preview"/>
                                                </a>
                                            </div>
                                            <div className="col-3">
                                                <label>Scoring:</label><br/>
                                                <input type="number" min="0" max="10" step="1" defaultValue="0" className="checktask-scoring" id={sub.studentName+task.id+"score"}/>
                                            </div>
                                            <div className="col-3">
                                                <button className="btn btn-warning submit-score-btn" onClick={() => this.handleScore(task.id,sub.studentName)}>
                                                    Submit Score
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    );
                })
            );
        }
        return (
            <Fragment>
                <Navbar option="check"/>
                <div className="checktask-level">
                    <label>Task Level:</label><br/>
                    <select id="checklevel" className="btn btn-dark check-select-btn" onChange={(e) => this.handleLevelChange(e)}>
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
