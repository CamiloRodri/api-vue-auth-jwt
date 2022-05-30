<template>
    <div>
        <div class="form-signin w-100 m-auto">
            <form @submit="addDoctor">
                <br><br><br>
                <center>
                    <h1 class="h3 mb-3 fw-normal">Agregar Doctor</h1>
                </center>
                <input v-model="name" type="text" class="form-control" placeholder="Nombre Doctor" >
                <input v-model="identification_number" type="text" class="form-control" placeholder="Numero de Identificación" >
                <select v-model="id_speciality" class="form-select" aria-label="Default select example" placeholder="Especialidad">
                <option
                    v-for="item in specialities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                </option>
            </select>
                <div class="alert alert-danger" role="alert" v-if="msgError != null">
                    {{ msgError }}
                </div>
                <br>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Agregar</button>
            </form>
        </div>
        <br><br>
        <div class="container">
            <table class="table table-striped">
                <thead class="text-center">
                    <tr>
                    <th scope="col">Nombre Doctor</th>
                    <th scope="col">Identificación Doctor</th>
                    <th scope="col">Especialidad</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="item in doctors" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.identification_number }}</td>
                        <td>{{ item.speciality.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
import router from '@/router';
export default {
    name: 'Diary',
    data() {
        return {
            doctors: [],
            specialities: [],
            name: null,
            identification_number: null,
            id_speciality: null,
            msgError: null,
        }
    },
    mounted() {
        if( !localStorage.getItem('token')){
            router.push('/login');
        }
        else{
            this.getDoctors();
            this.getSpeciality();
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
        getSpeciality(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .get('http://127.0.0.1:8000/api/specialities')
                .then(response => {
                    this.specialities = response.data;
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        },
        addDoctor(){
            if(this.name == null || this.name == '' || this.identification_number == null || this.identification_number == '' ){
                this.msgError = "Datos Obligatorios";
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
                let formData = new FormData();
                formData.append("name", this.name);
                formData.append("identification_number", this.identification_number);
                formData.append("id_speciality", this.id_speciality);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                axios.defaults.withCredentials = true;
                axios
                    .post('http://127.0.0.1:8000/api/doctors', formData,{
                        headers: {'Content-Type' : 'application/json'}
                    })
                    .then(response => {
                        alert("Paciente Agregado Correctamente");
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "No se puede agregar el paciente";
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