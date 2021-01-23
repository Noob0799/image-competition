import './App.css';
import Landing from './components/landing/Landing';
import Student from './components/student/Student';
import Instructor from './components/instructor/Instructor';
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/instructor" component={Instructor}/>
        <Route exact path="/student" component={Student}/>
      </Router>
    </div>
  );
}

export default App;
