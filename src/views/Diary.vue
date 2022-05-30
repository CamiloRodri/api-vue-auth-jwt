<template>
    <div class="form-signin w-100 m-auto">
        <form @submit="generateDiary">
            <br><br><br>
            <center>
                <h1 class="h3 mb-3 fw-normal">Generar Agenda</h1>
            </center>
            <label for="">Doctor: </label>
            <select v-model="id_doctor" class="form-select" aria-label="Default select example" placeholder="Doctor">
                <option
                    v-for="item in doctors"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                </option>
            </select>
            <label for="">Fecha Inicio: </label>
            <input v-model="start_date" type="date" class="form-control" placeholder="Fecha Inicio" format="dd-MM-yyyy" value-format="dd-MM-yyyy">
            <label for="">Fecha Fin: </label>
            <input v-model="end_date" type="date" class="form-control" placeholder="Fecha Fin">
            <label for="">Hora Inicio: </label>
            <input v-model="start_time" type="time" class="form-control" placeholder="Hora Inicio">
            <label for="">Hora Fin: </label>
            <input v-model="end_time" type="time" class="form-control" placeholder="Hora Fin">
            <div class="alert alert-danger" role="alert" v-if="msgError != null">
                {{ msgError }}
            </div>
            <br>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Generar</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
import router from '@/router';
export default {
    name: 'Diary',
    data() {
        return {
            id_doctor : null, 
            start_date : null, 
            end_date : null, 
            start_time : null,
            end_time : null, 
            msgError: null,
            doctors: [],
        }
    },
    mounted() {
        if( !localStorage.getItem('token')){
            router.push('/login');
        }
        else{
            this.getDoctors();
        }
    },
    methods:{
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
        generateDiary(){
            if(this.id_doctor == null || this.id_doctor == '' || this.start_date == null || this.start_date == '' || this.end_date == null || this.end_date == "" || this.start_time == null || this.start_time == '' || this.end_time == null || this.end_time == '' ){
                this.msgError = "Datos Obligatorios";
                console.log(this.formatoFecha(this.start_date));
                setTimeout(() => {
                    this.cleanMessage();
                }, 2000);
            }
            else{
                let formData = new FormData();
                formData.append("id_doctor", this.id_doctor);
                formData.append("start_date", this.formatoFecha(this.start_date));
                formData.append("end_date", this.formatoFecha(this.end_date));
                formData.append("start_time", this.start_time);
                formData.append("end_time", this.end_time);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                axios.defaults.withCredentials = true;
                axios
                    .post('http://127.0.0.1:8000/api/diaries', formData,{
                        headers: {'Content-Type' : 'application/json'}
                    })
                    .then(response => {
                        alert("Agenda Generada Correctamente");
                        location.reload();
                    })
                    .catch(error => {
                        this.msgError = "No se puede generar la agenda";
                        setTimeout(() => {
                            this.cleanMessage();
                        }, 2000);
                    });
            }
        },
        cleanMessage(){
            this.msgError = null;
        },
        formatoFecha(fecha) {
            if (fecha != null) {
                var time = new Date(fecha);
                return time.toLocaleString("es-CO", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                });
            } else {
                return fecha;
            }
        },  
    }
}
</script>

<style>

</style>