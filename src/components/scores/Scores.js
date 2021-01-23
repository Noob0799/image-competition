import React, { Fragment } from 'react'
import taskStore from '../../reducer/taskReducer';

const Scores = (props) => {
    const taskList = [...taskStore.getState().taskList];
    const beginnersTask = [...taskList[0].tasks];
    const intermediateTask = [...taskList[1].tasks];
    const advancedTask = [...taskList[2].tasks];
    const showScores = (taskArr) => {
        if(taskArr.length > 0) {
            return (
                taskArr.map(task => {
                    return (
                        <div key={task.id}>
                            <p>Task Name: {task.taskname}</p>
                            <p>Submissions:</p>
                            {
                                task.submissions.map(sub => {
                                    return (
                                        <div key={task.id+sub.studentName}>
                                            <p>Student Name: {sub.studentName}</p>
                                            <p>Marks out of 10: {sub.score ? sub.score : 'NA'}</p>
                                        </div>
                                    )
                                })
                            }
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
    const handleRoute = (option) => {
        if(option === 'home') {
            props.history.push('/');
        }
    }
    return (
        <Fragment>
            <div>
                <input type="button" value="Back" onClick={() => handleRoute('home')}/>
            </div>
            <p>Beginners</p>
            {showScores(beginnersTask)}
            <p>Intermediate</p>
            {showScores(intermediateTask)}
            <p>Advanced</p>
            {showScores(advancedTask)}
        </Fragment>
    )
}

export default Scores;
