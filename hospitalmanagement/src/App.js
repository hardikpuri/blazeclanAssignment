import './App.css';
import adminLogin from './components/login/adminLogin';
import AdminHome from './components/Home/adminHome';
import DoctorList from './components/CURDcomponents/doctor/doctorList';
import {BrowserRouter} from 'react-router-dom';
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Redirect, Link, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
        {
          <Switch>
            <Route exact path="/adminLogin" component={adminLogin}></Route>
            <Route exact path="/adminHome" component={AdminHome}></Route>
            <Route exact path="/Doctor" component={DoctorList}></Route>
          </Switch>
        }
      

    </div>
    </BrowserRouter>
  );
}

export default App;
