import './App.css';
import adminLogin from './components/login/adminLogin';
import AdminHome from './components/Home/adminHome';
import DoctorList from './components/CURDcomponents/doctor/doctorList';
import {BrowserRouter} from 'react-router-dom';

import StaffList from './components/CURDcomponents/staff/staffList';
import StaffEdit from './components/CURDcomponents/staff/editStaff';
import AddStaff from './components/CURDcomponents/staff/addStaff';

import WardList from './components/CURDcomponents/ward/wardList';

import DoctorLogin from './components/login/doctorLogin';
import DoctorHome from './components/Home/doctorHome';
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


            <Route exact path="/staff" component={StaffList}></Route>
            <Route exact path="/editStaff/:id" component={StaffEdit}></Route>
            <Route exact path="/addStaff" component={AddStaff}></Route>

            <Route exact path="/ward" component={WardList}></Route>

            <Route exact path="/doctorLogin" component={DoctorLogin}></Route>
            <Route exact path="/doctorHome" component={DoctorHome}></Route>
          </Switch>
        }
      

    </div>
    </BrowserRouter>
  );
}

export default App;
