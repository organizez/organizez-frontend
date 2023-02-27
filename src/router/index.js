import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import AdminArea from '../views/AdminArea.vue'
import Form from '../views/Form.vue'
import Services from '../views/Services.vue'
import ServiceDetails from '../views/ServiceDetails.vue'
import Portofolio from '../views/Portofolio.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/home/:idUser?',
        name: 'home',
        component: Home
    },
    {
        path: '/admin/:idUser',
        name: 'admin',
        component: AdminArea
    },
    {
        path: '/services/:idUser?',
        name: 'services',
        component: Services
    },
    {
        path: '/:idService',
        name: 'service-details',
        component: ServiceDetails
    },
    {
        path: '/portofolio/test',
        name: 'portofolio',
        component: Portofolio
    },
    {
        path: '/form',
        name: 'form',
        component: Form
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router