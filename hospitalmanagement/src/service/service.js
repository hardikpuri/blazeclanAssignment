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
    getAppointment(token, staffno){
        let response = axios.get(`http://localhost:9081/appoint/get/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getMedicineData(token, staffno){
        let response = axios.get(`http://localhost:9081/medicine/get`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    dischargePatient(token, id){
        console.log(id);
        let response = axios.get(`http://localhost:9081/dischargePatient/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getDischargeData(token){
        let response = axios.get(`http://localhost:9081/dischargePatientlist`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getCharges(token){
        let response = axios.get(`http://localhost:9081/charges`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    wardCharge(token,ward){
        let response = axios.get(`http://localhost:9081/ward/charge/${ward}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    doctorCharge(token,id){
        let response = axios.get(`http://localhost:9081/doctor/charge/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    clearBill(token,id){
        let response = axios.get(`http://localhost:9081/discharge/del/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}