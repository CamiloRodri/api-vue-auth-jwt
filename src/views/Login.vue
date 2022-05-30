<template>
    <!-- <div class="form-signin w-100 m-auto">
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
    </div> -->
    <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image">
                            <img class="mb-4" src="../assets/img/facebook_profile_image.png" alt="" width="100%" height="100%">
                        </div>
                        <div class="col-lg-6">
                            <br><br><br><br>
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Bienvenido</h1>
                                </div>
                                <form class="user" @submit.prevent="login">
                                    <div class="form-group">
                                        <input v-model="data.email" type="email" class="form-control"  placeholder="nombre@ejemplo.com">
                                        <!-- <input v-model="data.email" type="email"  class="form-control form-control-user" name="InputNick" aria-describedby="emailHelp" placeholder="Ingrese su usuario..."> -->
                                    </div>
                                    <div class="form-group">
                                        <input v-model="data.password" type="password" class="form-control" placeholder="Password">
                                    <!-- <input v-model="data.password" type="password" class="form-control form-control-user" name="InputPassword" placeholder="Contraseña"> -->
                                    </div>

                                    <div class="alert alert-danger" role="alert" v-if="msgError != null">
                                    {{ msgError }}
                                    </div>
                                    <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            },
            msgError: null
        }
    },
    mounted() {
        if( localStorage.getItem('token')){
            router.push('/');
        }
    },
    methods: {
        login(){
            if(this.data.email == null || this.data.email == '' || this.data.password == null || this.data.password == ""){
                this.msgError = "Datos requeridos";
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
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
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "Usuario Invalido";
                        setTimeout(() => {
                            this.cleanMessage();
                        }, 2000);
                    });
            }
        },
        cleanMessage(){
            this.msgError = null;
        }
    },
}
</script>
