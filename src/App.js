import './App.css';
import Landing from './components/landing/Landing';
import Student from './components/student/Student';
import CreateTask from './components/instructor/createtask/CreateTask';
import CheckTask from './components/instructor/checktask/CheckTask';
import Scores from './components/scores/Scores.js';
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/instructor/set" component={CreateTask}/>
        <Route exact path="/instructor/check" component={CheckTask}/>
        <Route exact path="/student" component={Student}/>
        <Route exact path="/scores" component={Scores}/>
      </Router>
    </div>
  );
}

export default App;
