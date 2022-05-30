<template>
    <div class="form-signin w-100 m-auto">
        <form @submit.prevent="login">
            <img class="mb-4" src="../assets/profile_image.png" alt="" width="100%" height="300%">
            <center>
                <h1 class="h3 mb-3 fw-normal">Login</h1>
            </center>
                <input v-model="data.email" type="email" class="form-control"  placeholder="nombre@ejemplo.com">
                <input v-model="data.password" type="password" class="form-control" placeholder="Password">
            <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
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
    name:'Login',
    data() {
        return {
            data:{
                email: '',
                password: ''
            }
        }
    },
    mounted() {
        if( localStorage.getItem('token')){
            router.push('/');
        }
    },
    methods: {
        login(){
            let formData = new FormData();
            formData.append("email", this.data.email);
            formData.append("password", this.data.password);
            axios
                .post('http://127.0.0.1:8000/api/login', formData,{
                    credentials:'include',
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('token_type', response.data.token_type);
                    router.push('/');
                })
                .catch(error => {
                    alert("Datos Invalidos");
                });
        }
    },
}
</script>
