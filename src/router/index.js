import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import AdminArea from '../views/AdminArea.vue'
import EventForm from '../views/EventForm.vue'
import ContactForm from '../views/ContactForm.vue'
import Services from '../views/Services.vue'
import ServiceDetails from '../views/ServiceDetails.vue'
import Portofolio from '../views/Portofolio.vue'
import Blog from '../views/Blog.vue'
import BlogArticle from '../views/BlogArticle.vue'
import AboutUs from '../views/AboutUs.vue'
import DataPrivacyPolicy from '../views/DataPrivacyPolicy.vue'
import TermsConditions from '../views/TermsConditions.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/administrare/:idUser',
        name: 'admin',
        component: AdminArea
    },
    {
        path: '/autentificare',
        name: 'login',
        component: Login
    },
    {
        path: '/inregistrare',
        name: 'register',
        component: Register
    },
    {
        path: '/servicii/:idCounty/:idServicesCategory/:idUser?',
        name: 'services',
        component: Services
    },
    {
        path: '/serviciu/:idService/:idUser?',
        name: 'service',
        component: ServiceDetails
    },
    {
        path: '/portofoliu/:idUser?',
        name: 'portofolio',
        component: Portofolio
    },
    {
        path: '/blog/:idUser?',
        name: 'blog',
        component: Blog
    },
    {
        path: '/blog/articol/:idBlogArticle/:idUser?',
        name: 'blog-article',
        component: BlogArticle
    },
    {
        path: '/despre-noi/:idUser?',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/politica-de-confidentialitate-a-datelor/:idUser?',
        name: 'dataPrivacyPolicy',
        component: DataPrivacyPolicy
    },
    {
        path: '/termeni-si-conditii/:idUser?',
        name: 'termsConditions',
        component: TermsConditions
    },
    {
        path: '/formular-contact/:idUser?',
        name: 'contact-form',
        component: ContactForm
    },
    {
        path: '/formular-eveniment/:idUser?',
        name: 'event-form',
        component: EventForm
    },
    {
        path: '/:idUser?',
        name: 'home',
        component: Home
    },
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