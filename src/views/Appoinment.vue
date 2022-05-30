<template>
    <div class="form-signin w-100 m-auto">
        <form @submit="createPatient">
            <br><br><br>
            <center>
                <h1 class="h3 mb-3 fw-normal">Asignar Cita</h1>
            </center>
            <label for="">Pacientes: </label>
            <select v-model="id_patient" class="form-select" aria-label="Default select example" placeholder="Doctor">
                <option
                    v-for="item in patients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                </option>
            </select>
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
            <br>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Asignar</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
import router from '@/router';
export default {
    name: "Appoinment",
    data() {
        return {
            id_doctor : null, 
            id_patient : null, 
            id_diaries : null, 
            doctors: [],
            patients: [],
            diaries: [],
            msgError: null
        }
    },
    mounted() {
        if( !localStorage.getItem('token')){
            router.push('/login');
        }
        else{
            this.getPatients();
            this.getDoctors();
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
        createPatient(){
            if(this.id_patient == null || this.id_patient == '' || this.id_diaries == null || this.id_diaries == '' ){
                this.msgError = "Datos Obligatorios";
                console.log(this.formatoFecha(this.start_date));
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
                let formData = new FormData();
                formData.append("id_patient", this.id_patient);
                formData.append("id_diaries", this.id_diaries);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                axios.defaults.withCredentials = true;
                axios
                    .post('http://127.0.0.1:8000/api/appoinments', formData,{
                        headers: {'Content-Type' : 'application/json'}
                    })
                    .then(response => {
                        alert("Cita Agregada Con Exito");
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "No se puede agendar la cita";
                        setTimeout(() => {
                            this.cleanMessage();
                        }, 2000);
                    });
            }
        }
    },
}
</script>

<style>

</style>