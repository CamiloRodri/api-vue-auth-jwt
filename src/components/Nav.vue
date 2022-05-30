<template>
    <div>
		<!-- <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4"> -->
        <nav class="navbar navbar-expand-md" style="background-color: #47555e;">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand">Inicio</router-link>
				<div>
					<ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item" v-show="user_autenticated">
                            <router-link to="/speciality" class="nav-link active" aria-current="page">Especialidad</router-link>
                        </li>
                        <li class="nav-item" v-show="user_autenticated">
                            <router-link to="/patient" class="nav-link active" aria-current="page">Paciente</router-link>
                        </li>
                        <li class="nav-item" v-show="user_autenticated">
                            <router-link to="/doctor" class="nav-link active" aria-current="page">Doctor</router-link>
                        </li>
                        <li class="nav-item" v-show="user_autenticated">
                            <router-link to="/diary" class="nav-link active" aria-current="page">Crear Agenda</router-link>
                        </li>
                        <li class="nav-item" v-show="user_autenticated">
                            <router-link to="/appoinment" class="nav-link active" aria-current="page">Asignar Cita</router-link>
                        </li>
                        <li class="nav-item" v-show="!user_autenticated">
                            <router-link to="/login" class="nav-link active" aria-current="page">Login</router-link>
                        </li>
                        <li class="nav-item" v-show="!user_autenticated">
                            <router-link to="/register" class="nav-link active" aria-current="page" href="#">Registro</router-link>
                        </li>
                        <li class="nav-item" v-show="user_autenticated">
                            <a @click="logout" class="nav-link active" aria-current="page">Logout</a>
                        </li>
					</ul>
				</div>
			</div>
		</nav>
    </div>
</template>

<script>
import router from '@/router';
const axios = require('axios');
export default {
    name:'Nav',
    data() {
        return {
            user_autenticated : false
        }
    },
    mounted() {
        if( localStorage.getItem('token')){
            this.user_autenticated = true;
        }
    },
    methods: {
        logout(){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.withCredentials = true;
            axios
                .post('http://127.0.0.1:8000/api/logout')
                .then(response => {
                    localStorage.clear();
                    // router.push('/login');
                    location.reload();
                })
                .catch(error => {
                    alert("No se puede realizar esta acción");
                });
        }
    },
}
</script>