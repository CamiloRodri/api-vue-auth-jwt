<template>
    <div>
        <div class="form-signin w-100 m-auto">
            <form @submit="addSpeciality">
                <br><br><br>
                <center>
                    <h1 class="h3 mb-3 fw-normal">Agregar Especialidad</h1>
                </center>
                <input v-model="speciality" type="text" class="form-control" placeholder="Nombre Especialidad" >
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
                    <!-- <th scope="col">#</th> -->
                    <th scope="col">Nombre Especialidad</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="item in specialities" :key="item.id">
                        <!-- <th scope="row">1</th> -->
                        <td>{{ item.name }}</td>
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
            specialities: [],
            speciality: null,
            msgError: null,
        }
    },
    mounted() {
        if( !localStorage.getItem('token')){
            router.push('/login');
        }
        else{
            this.getSpeciality();
        }
    },
    methods: {
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
        addSpeciality(){
            if(this.speciality == null || this.speciality == ''){
                this.msgError = "Datos Obligatorios";
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
                let formData = new FormData();
                formData.append("name", this.speciality);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                axios.defaults.withCredentials = true;
                axios
                    .post('http://127.0.0.1:8000/api/specialities', formData,{
                        headers: {'Content-Type' : 'application/json'}
                    })
                    .then(response => {
                        alert("Especialidad Agregada Correctamente");
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "No se puede agregar la especialidad";
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