import axios from 'axios';

export class ServiceClass {

    getDoctorData(token){
        let response = axios.get('http://localhost:9081/doctor/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }


    getStaffData(token){
        let response = axios.get('http://localhost:9081/staff/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getWardData(token){
        let response = axios.get('http://localhost:9081/ward/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getPatientData(token){
        let response = axios.get('http://localhost:9081/patient/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getDoctorName(token){
        let response = axios.get('http://localhost:9081/doctor/name', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getStaffById(token,staffno){
        let response = axios.get(`http://localhost:9081/staff/getbyid/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getPatientByStaff(token,staffno){
        let response = axios.get(`http://localhost:9081/doctor/bystaffid/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getNurseData(token){
        let response = axios.get('http://localhost:9081/nurse/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getWardForNurse(token, staffno){
        let response = axios.get(`http://localhost:9081/nurse/ward/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getWardPatient(token, staffno){
        let response = axios.get(`http://localhost:9081/nurse/wardPatient/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}