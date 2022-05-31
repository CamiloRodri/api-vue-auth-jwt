import Appoinment from '@/views/Appoinment.vue'
import Doctor from '@/views/Doctor.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Patient from '@/views/Patient.vue'
import ReassignAppointment from '@/views/ReassignAppointment.vue'
import Register from '@/views/Register.vue'
import Speciality from '@/views/Speciality.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Diary from '../views/Diary.vue'

Vue.use(VueRouter)

const routes = [
  {path:'', component: Home},
  {path:'/login', component: Login},
  {path:'/register', component: Register},
  {path:'/diary', component: Diary},
  {path:'/appoinment', component: Appoinment},
  {path:'/speciality', component: Speciality},
  {path:'/patient', component: Patient},
  {path:'/doctor', component: Doctor},
  {path:'/reassign_appointment', component: ReassignAppointment},
]

const router = new VueRouter({
  routes
})

export default router
