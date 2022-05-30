<template>
    <div class="form-signin w-100 m-auto">
        <form @submit="saveUser">
            <br><br><br><br><br>
            <center>
                <h1 class="h3 mb-3 fw-normal">Registro</h1>
            </center>
            <input v-model="data.name" type="text" class="form-control"  placeholder="Nombre">
            <input v-model="data.email" type="email" class="form-control"  placeholder="nombre@ejemplo.com">
            <input v-model="data.password" type="password" class="form-control" placeholder="Contraseña">
            <input v-model="data.password_confirmation" type="password" class="form-control" placeholder="Confirmar Contraseña">
            <div class="alert alert-danger" role="alert" v-if="msgError != null">
                {{ msgError }}
            </div>
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
            },
            msgError: null
        }
    },
    mounted() {
        if( localStorage.getItem('token')){
            router.push('/');
        }
    },
    methods:{
        saveUser(){
            if(this.data.name == null || this.data.name == '' || this.data.email == null || this.data.email == '' || this.data.password == null || this.data.password == "" || this.data.password_confirmation == null || this.data.password_confirmation == '' ){
                this.msgError = "Datos Obligatorios";
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else if(this.data.password != this.data.password_confirmation){
                this.msgError = "Las contraseñas no coinciden";
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
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
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('token_type', response.data.token_type);
                        alert("Usuario Registrado");
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "No se puede registrar este usuario";
                        setTimeout(() => {
                            this.cleanMessage();
                        }, 2000);
                    });
            }
        },
        cleanMessage(){
            this.msgError = null;
        }
    }
}
</script>

<style>

</style>