import './App.css';
import adminLogin from './components/login/adminLogin';
import AdminHome from './components/Home/adminHome';
import DoctorList from './components/CURDcomponents/doctor/doctorList';
import MedicalLogin from './components/login/medicalLogin';
import MedicalList from './components/CURDcomponents/medicine/medicineList';
import AddMedicine from './components/CURDcomponents/medicine/medicineAdd';
import MedicalHome from './components/Home/medicalHome';
import {BrowserRouter} from 'react-router-dom';
import ReceptionLogin from './components/login/receptionLogin';
import ReceptionHome from './components/Home/receptionHome';
import StaffList from './components/CURDcomponents/staff/staffList';
import StaffEdit from './components/CURDcomponents/staff/editStaff';
import AddStaff from './components/CURDcomponents/staff/addStaff';
import AddDoctor from './components/CURDcomponents/doctor/addDoctor';
import WardList from './components/CURDcomponents/ward/wardList';
import RegisterUser from './components/CURDcomponents/user/registeruser';
import DoctorLogin from './components/login/doctorLogin';
import DoctorHome from './components/Home/doctorHome';
import UserList  from './components/CURDcomponents/user/userList';
import NurseList from './components/CURDcomponents/nurse/nurseList';
import AddNurse from './components/CURDcomponents/nurse/addNurse';
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Redirect, Link, Switch} from 'react-router-dom';
import PatientList from './components/CURDcomponents/patient/patientList';
import AddPatient from './components/CURDcomponents/patient/addPatient';
import EditPatient from './components/CURDcomponents/patient/editPatient';
import DoctorPatientList from './components/CURDcomponents/patient/doctorpatientlist';
import NurseLogin from './components/login/nurseLogin';
import NurseHome from './components/Home/nurseHome';
import Nursepatient from './components/CURDcomponents/nurse/nursePatient';
import AppointPatient from './components/CURDcomponents/doctor/appointPatient';
import DischargeList from './components/CURDcomponents/patient/dischargeList';
import GenerateBill from './components/CURDcomponents/generateBill';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
        {
          <Switch>
            <Route exact path="/adminLogin" component={adminLogin}></Route>
            <Route exact path="/adminHome" component={AdminHome}></Route>
            <Route exact path="/registeruser" component={RegisterUser}></Route>
            <Route exact path="/userlist" component={UserList}></Route>

            <Route exact path="/Doctor" component={DoctorList}></Route>
            <Route exact path="/addDoctor" component={AddDoctor}></Route>
            <Route exact path="/doctorpatientlist" component={DoctorPatientList}></Route>
            <Route exact path="/appoint" component={AppointPatient}></Route>

            <Route exact path="/patientlist" component={PatientList}></Route>
            <Route exact path="/addPatient" component={AddPatient}></Route>
            <Route exact path="/editpatient/:id" component={EditPatient}></Route>
            <Route exact path="/dischargeList" component={DischargeList}></Route>
            <Route exact path="/generateBill/:id" component={GenerateBill}></Route>

            <Route exact path="/receptionLogin" component={ReceptionLogin}></Route>
            <Route exact path="/receptionHome" component={ReceptionHome}></Route>
            <Route exact path="/staff" component={StaffList}></Route>
            <Route exact path="/editStaff/:id" component={StaffEdit}></Route>
            <Route exact path="/addStaff" component={AddStaff}></Route>

            <Route exact path="/ward" component={WardList}></Route>

            <Route exact path="/doctorLogin" component={DoctorLogin}></Route>
            <Route exact path="/doctorHome" component={DoctorHome}></Route>

            <Route exact path="/nurseList" component={NurseList}></Route>
            <Route exact path="/addNurse" component={AddNurse}></Route>
            <Route exact path="/nurseLogin" component={NurseLogin}></Route>
            <Route exact path="/nurseHome" component={NurseHome}></Route>
            <Route exact path='/nursepatient' component={Nursepatient}></Route>

            <Route exact path="/medicalLogin" component={MedicalLogin}></Route>
            <Route exact path="/medicalHome" component={MedicalHome}></Route>
            <Route exact path="/medicineList" component={MedicalList}></Route>
            <Route exact path="/addMedicine" component={AddMedicine}></Route>
          </Switch>
        }
      

    </div>
    </BrowserRouter>
  );
}

export default App;
