import { createStore } from "redux";

const initState = {
    taskList: [
        {
            level: "Beginner",
            tasks: []
        },
        {
            level: "Intermediate",
            tasks: []
        },
        {
            level: "Advanced",
            tasks: []
        }
    ],
    id: 1
}

const taskReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'ADD_TASK') {
        if(action.taskObj.level === 'Beginner') {
            state.taskList[0].tasks.push(action.taskObj);
        } else if(action.taskObj.level === 'Intermediate') {
            state.taskList[1].tasks.push(action.taskObj);
        } else {
            state.taskList[2].tasks.push(action.taskObj);
        }
        state.id += 1;
    } else if(action.type === 'UPDATE_TASK') {
        state.taskList = [...action.taskList]
    }
    console.log('State', state);
    return state;
}

const store = createStore(taskReducer);

export default store;