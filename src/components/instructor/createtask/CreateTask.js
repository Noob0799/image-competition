import React, { Component, Fragment } from 'react'
import ImageCapture from './ImageCapture'
import './CreateTask.css';
import taskStore from '../../../reducer/taskReducer';
import Navbar from '../../utils/Navbar';

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
            capture: !this.state.capture
        });
    }

    handleImage = (image) => {
        this.setState({
            image: image,
            capture: false
        });
    }

    getUploadedTaskImage = () => {
        let uploadedsolution = '';
        const file = document.getElementById("uploadtask").files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                uploadedsolution = reader.result;
                this.setState({
                    image: uploadedsolution
                });
            };
            reader.readAsDataURL(file);
        }
    }

    setTask = () => {
        const taskname = document.querySelector("#taskname").value;
        const level = document.querySelector("#level").value;
        const instructions = document.querySelector('#instructions').value;
        if(taskname && level && instructions && this.state.image) {
            taskStore.dispatch({type: 'ADD_TASK', taskObj: {id: taskStore.getState().id,taskname,level,instructions,imageuri: this.state.image, submissions: []}});
            this.reset();
        }
    }

    reset = () => {
        document.querySelector("#taskname").value = '';
        document.querySelector("#level").value = 'Beginner';
        document.querySelector('#instructions').value = '';
        document.querySelector('#uploadtask').value = '';
        this.setState({
            capture: false,
            image: ''
        });
    }


    render() {
        return (
            <Fragment>
                <Navbar option="set"/>
                <div className="createtask-container">
                    <div className="createtask-image">
                        <label>Click to capture task</label><br/>
                        <input type="button" className="btn btn-dark capture-btn" value={!this.state.capture ? "Capture" : "Close"} onClick={this.handleCapture}/>
                        <div className="createtask-imagecapture" hidden={!this.state.capture}>
                            <ImageCapture image={this.handleImage}/>
                        </div>
                        {
                                this.state.image ? 
                                (
                                    <div className="createtask-imagepreview">
                                        <img src={this.state.image} alt="Preview"/>
                                    </div>
                                ) :
                                (
                                    <p>Image previewed here...</p>
                                )
                        }
                        <div className="createtask-imageupload">
                            <label>Click to upload task</label><br/>
                            <input type="file" className="btn btn-dark upload-btn" id="uploadtask" onChange={this.getUploadedTaskImage}/>
                        </div>
                    </div>
                    <div className="createtask-text">
                        <div className="createtask-level">
                            <label>Task Level:</label><br/>
                            <select id="level" className="btn btn-dark select-btn">
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
                    <input type="button" value="Set Task" className="btn btn-dark set-task-btn" onClick={this.setTask}/>
                </div>
            </Fragment>
        )
    }
}
