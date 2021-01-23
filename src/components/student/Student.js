import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router';
import taskStore from '../../reducer/taskReducer';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            level: 'Beginner',
            details: {}
        };
    }

    componentDidMount() {
        this.unsubscribe = taskStore.subscribe(() => this.handleStateChange(taskStore)); //subscription to store
        this.setState({
            tasks: [...taskStore.getState().taskList],
            details: this.props.location.state
        });
    }

    //callback to handle change in redux store
    handleStateChange = (store) => {
        console.log(store.getState().taskList);
        this.setState({
            tasks: [...store.getState().taskList]
        });
    }

    handleLevelChange = (e) => {
        this.setState({
            level: e.target.value
        });
    }

    handleRoute = (option) => {
        if(option === 'home') {
            this.props.history.push('/');
        }
    }

    handleUpdate = (id,studentname,uploadedsolution) => {
        const taskList = this.state.tasks;
        if(this.state.level === 'Beginner') {
            for(let i=0;i<taskList[0].tasks.length;i++) {
                if(taskList[0].tasks[i].id === id) {
                    taskList[0].tasks[i].submissions.push({studentName: studentname, imageuri: uploadedsolution});
                    taskList[0].tasks[i].isCompleted = true;
                }
            }
        } else if(this.state.level === 'Intermediate') {
            for(let i=0;i<taskList[1].tasks.length;i++) {
                if(taskList[1].tasks[i].id === id) {
                    taskList[1].tasks[i].submissions.push({studentName: studentname, imageuri: uploadedsolution});
                    taskList[1].tasks[i].isCompleted = true;
                }
            }
        } else {
            for(let i=0;i<taskList[2].tasks.length;i++) {
                if(taskList[2].tasks[i].id === id) {
                    taskList[2].tasks[i].submissions.push({studentName: studentname, imageuri: uploadedsolution});
                    taskList[2].tasks[i].isCompleted = true;
                }
            }
        }
        this.setState({
            tasks: [...taskList]
        });
        taskStore.dispatch({type: 'UPDATE_TASK', taskList: taskList});
    }

    handleSubmit = (id) => {
        const studentname = document.getElementById("studentname"+id).value;
        let uploadedsolution = '';
        const file = document.getElementById("uploadsolution"+id).files[0];
        if(studentname && file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                uploadedsolution = reader.result;
                if(studentname && uploadedsolution) {
                    this.handleUpdate(id,studentname,uploadedsolution);
                }
            };
            reader.readAsDataURL(file);
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
                if(!element.isCompleted) {
                    displayTasks.push(element);
                }
            });
        }
        let elem = <p>There are no tasks to complete...</p>;
        if(displayTasks.length > 0) {
            elem = (
                displayTasks.map(task => {
                    return (
                        <div key={task.id}>
                            <div><label>Task Id:</label><br/>{task.id}</div>
                            <div><label>Task Name:</label><br/>{task.taskname}</div>
                            <div><label>Task Details:</label><br/>{task.instructions}</div>
                            <div>
                                <label>Task Image:</label><br/>
                                <a href={task.imageuri} download={"Task_"+task.level+"_"+task.id+".jpg"}>
                                    <img src={task.imageuri} alt="Preview" width="128" height="96"/>
                                </a>
                            </div>
                            <div>
                                <div>
                                    <label>Name:</label><br/>
                                    <div><input type="text" id={"studentname"+task.id}/></div>
                                    <label>Upload Edited Image:</label>
                                    <div>
                                        <input type="file" id={"uploadsolution"+task.id}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="button" value="Submit Task" onClick={() => this.handleSubmit(task.id)}/>
                            </div>
                        </div>
                    );
                })
            );
        }
        return (
            <Fragment>
                <div>
                    <input type="button" value="Back" onClick={() => this.handleRoute('home')}/>
                </div>
                <div className="student-level">
                    <label>Task Level:</label><br/>
                    <select id="studentlevel" onChange={(e) => this.handleLevelChange(e)}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div className="studenttask-display">
                    {elem}
                </div>
            </Fragment>
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default withRouter(Student);
