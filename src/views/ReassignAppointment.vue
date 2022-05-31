<template>
    <div>
        <div class="form-signin w-100 m-auto">
            <label for="">Pacientes: </label>
            <select v-model="id_patient" class="form-select" aria-label="Default select example" placeholder="Patient" @change="getAppointmentPacientId()">
                <option
                    v-for="item in patients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                </option>
            </select>
        </div>
        <br><br>
        <div class="container">
            <table class="table table-striped">
                <thead class="text-center">
                    <tr>
                    <th scope="col">Fecha Cita</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="item in appoinments_id" :key="item.id">
                        <td>{{ item.diary.date_diary }}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="dataModal(item.diary.id)">
                                Reasignar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reasignar Cita</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit="reassignAppointment">
                        <div class="modal-body">
                                <label for="">Doctor: </label>
                                <select v-model="id_doctor" class="form-select" aria-label="Default select example" placeholder="Doctor" @change="getAppoinment">
                                    <option
                                        v-for="item in doctors"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                        >
                                    </option>
                                </select>
                                <label for="">Citas Disponibles: </label>
                                <select v-model="id_diaries" class="form-select" aria-label="Default select example" placeholder="Doctor">
                                    <option
                                        v-for="item in diaries"
                                        :key="item.id"
                                        :label="item.date_diary"
                                        :value="item.id"
                                        >
                                    </option>
                                </select>
                                <div class="alert alert-danger" role="alert" v-if="msgError != null">
                                    {{ msgError }}
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
const axios = require('axios');
import router from '@/router';
export default {
    name: 'ReassignAppointment',
    data() {
        return {
            id_patient : null, 
            id_doctor : null, 
            id_diaries : null, 
            patients: [],
            appoinments_id: [],
            doctors: [],
            diaries: [],
            id_appoinment: null,
            msgError: null,
        }
    },
    mounted() {
        if( !localStorage.getItem('token')){
            router.push('/login');
        }
        else{
            this.getDoctors();
            this.getPatients();
            this.getAppoinment();
        }
    },
    methods: {
        getDoctors(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .get('http://127.0.0.1:8000/api/doctors')
                .then(response => {
                    this.doctors = response.data;
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        },
        getPatients(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .get('http://127.0.0.1:8000/api/patients')
                .then(response => {
                    this.patients = response.data;
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        },
        getAppointmentPacientId(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .get(`http://127.0.0.1:8000/api/appoinments/${this.id_patient}`)
                .then(response => {
                    this.appoinments_id = response.data;
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        },
        getAppoinment(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .get(`http://127.0.0.1:8000/api/diaries/${this.id_doctor}`)
                .then(response => {
                    this.diaries = response.data;
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        },
        dataModal(data){
            this.id_appoinment = data;
        },
        reassignAppointment(){
            let formData = new FormData();
            formData.append("id_patient", this.id_patient);
            formData.append("id_diaries", this.id_diaries);

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .post('http://127.0.0.1:8000/api/updateappoinments/'+this.id_appoinment, formData,{
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(response => {
                    alert("Cita Reagendada Con Exito");
                    location.reload();
                })
                .catch(error => {
                    alert("Cita Reagendada Con Exito");
                    location.reload();
                    // this.msgError = "No se puede Reagendar la cita";
                    // setTimeout(() => {
                    //     this.cleanMessage();
                    // }, 2000);
                });
        }
    },
}
</script>