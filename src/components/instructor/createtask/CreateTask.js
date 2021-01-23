import React, { Component, Fragment } from 'react'
import ImageCapture from './ImageCapture'
import './CreateTask.css';
import taskStore from '../../../reducer/taskReducer';

export default class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capture: false,
            image: ''
        };
    }

    handleCapture = () => {
        this.setState({
            capture: true
        });
    }

    handleImage = (image) => {
        this.setState({
            image: image,
            capture: false
        });
    }

    setTask = () => {
        const taskname = document.querySelector("#taskname").value;
        const level = document.querySelector("#level").value;
        const instructions = document.querySelector('#instructions').value;
        if(taskname && level && instructions && this.state.image) {
            taskStore.dispatch({type: 'ADD_TASK', taskObj: {id: taskStore.getState().id,taskname,level,instructions,imageuri: this.state.image, isCompleted: false, isChecked: false, submissions: []}});
            this.reset();
        } 
    }

    reset = () => {
        document.querySelector("#taskname").value = '';
        document.querySelector("#level").value = 'Beginner';
        document.querySelector('#instructions').value = '';
        this.setState({
            capture: false,
            image: ''
        });
    }

    render() {
        return (
            <Fragment>
                <div className="createtask-container">
                    <div className="createtask-image">
                        <input type="button" value="Capture" onClick={this.handleCapture}/>
                        {
                            this.state.capture ? 
                            (
                                <div className="createtask-imagecapture">
                                    <ImageCapture image={this.handleImage}/>
                                </div>
                            ) : 
                            (
                                this.state.image ? 
                                (
                                    <div className="createtask-imagepreview">
                                        <img src={this.state.image} alt="Preview" width="320" height="240"/>
                                    </div>
                                ) :
                                (
                                    <div className="createtask-imageupload">
                                        <input type="file" id="uploadtask"/>
                                    </div>
                                )
                            )

                        }
                    </div>
                    <div className="createtask-text">
                        <div className="createtask-level">
                            <label>Task Level:</label><br/>
                            <select id="level">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="createtask-instructions">
                            <label>Task Name:</label><br/>
                            <input type="text" id="taskname"/>
                        </div>
                        <div className="createtask-instructions">
                            <label>Task Instructions:</label><br/>
                            <textarea id="instructions" rows="4"/>
                        </div>
                    </div>
                </div>
                <div className="createtask-submit">
                    <input type="button" value="Set Task" onClick={this.setTask}/>
                </div>
            </Fragment>
        )
    }
}
