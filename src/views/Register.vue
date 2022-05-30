<template>
    <div class="form-signin w-100 m-auto">
        <form @submit.prevent="saveUser">
            <!-- <img class="mb-4" src="../assets/profile_image.png" alt="" width="100%" height="300%"> -->
            <center>
                <h1 class="h3 mb-3 fw-normal">Registro</h1>
            </center>
            <input v-model="data.name" type="text" class="form-control"  placeholder="Nombre">
            <input v-model="data.email" type="email" class="form-control"  placeholder="nombre@ejemplo.com">
            <input v-model="data.password" type="password" class="form-control" placeholder="Contraseña">
            <input v-model="data.password_confirmation" type="password" class="form-control" placeholder="Confirmar Contraseña">
            <button class="w-100 btn btn-lg btn-primary" type="submit">Agregar</button>
            <center>
                <p class="mt-5 mb-3 text-muted">2022</p>
            </center>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
import router from '@/router';
export default {
    name:'Register',
    data() {
        return {
            data:{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    mounted() {
        if( localStorage.getItem('token')){
            router.push('/');
        }
    },
    methods:{
        saveUser(){
            let formData = new FormData();
            formData.append("name", this.data.name);
            formData.append("email", this.data.email);
            formData.append("password", this.data.password);
            formData.append("password_confirmation", this.data.password_confirmation);
            axios
                .post('http://127.0.0.1:8000/api/register', formData,{
                    // method: 'POST',
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(response => {
                    console.log(response);
                    router.push('/login');
                })
                .catch(error => {
                    alert("No se puede registrar este usuario");
                });
        }
    }
}
</script>

<style>

</style>