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
import Blog from '../views/Blog.vue'
import BlogArticle from '../views/BlogArticle.vue'
import AboutUs from '../views/AboutUs.vue'
import Anpc from '../views/Anpc.vue'
import DataPrivacyPolicy from '../views/DataPrivacyPolicy.vue'
import TermsConditions from '../views/TermsConditions.vue'

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
    {
        path: '/blog/test',
        name: 'blog',
        component: Blog
    },
    {
        path: '/blog/:idBlogArticle',
        name: 'blog-article',
        component: BlogArticle
    },
    {
        path: '/aboutUs/test',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/anpc/test',
        name: 'anpc',
        component: Anpc
    },
    {
        path: '/dataPrivacyPolicy/test',
        name: 'dataPrivacyPolicy',
        component: DataPrivacyPolicy
    },
    {
        path: '/termsConditions/test',
        name: 'termsConditions',
        component: TermsConditions
    }

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