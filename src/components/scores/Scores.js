import React, { Fragment } from 'react'
import taskStore from '../../reducer/taskReducer';
import './Scores.css';
import Navbar from '../utils/Navbar';

const Scores = (props) => {
    const taskList = [...taskStore.getState().taskList];
    const beginnersTask = [...taskList[0].tasks];
    const intermediateTask = [...taskList[1].tasks];
    const advancedTask = [...taskList[2].tasks];
    const showScores = (taskArr,level) => {
        if(taskArr.length > 0) {
            return (
                taskArr.map(task => {
                    return (
                        <div key={task.id} className="scores-container row">
                            <div className="col-6 scores-task">
                                <label>Task Id: {task.id}</label>
                                <label>Task Name: {task.taskname}</label>
                            </div>
                            <div className="col-6">
                            {
                                task.submissions.map(sub => {
                                    return (
                                        <div key={task.id+sub.studentName} className="scores-student my-1">
                                            <div>Student Name: {sub.studentName}</div>
                                            <div>Marks out of 10: {sub.score ? sub.score : 'NA'}</div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            );
        } else {
            return (
                <p>No task to show...</p>
            );
        }
    }
    return (
        <Fragment>
            <Navbar option="score"/>
            {
                beginnersTask.length > 0 ? 
                (
                    <div className="beginner">
                        <p>Level: Beginner</p>
                        {showScores(beginnersTask,'Beginner')}
                    </div>
                ) : null
            }
            {
                intermediateTask.length > 0 ?
                (
                    <div className="intermediate">
                        <p>Level: Intermediate</p>
                        {showScores(intermediateTask,'Intermediate')}
                    </div>
                ) : null
            }
            {
                advancedTask.length > 0 ?
                (
                    <div className="advanced">
                        <p>Level: Advanced</p>
                        {showScores(advancedTask,'Advanced')}
                    </div>
                ) : null
            }
        </Fragment>
    )
}

export default Scores;
